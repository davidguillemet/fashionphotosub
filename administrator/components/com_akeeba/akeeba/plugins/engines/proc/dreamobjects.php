<?php
/**
 * Akeeba Engine
 * The modular PHP5 site backup engine
 * @copyright Copyright (c)2009-2014 Nicholas K. Dionysopoulos
 * @license GNU GPL version 3 or, at your option, any later version
 * @package akeebaengine
 *
 */

// Protection against direct access
defined('AKEEBAENGINE') or die();

class AEPostprocDreamobjects extends AEAbstractPostproc
{
	public $cache = null;

	public function __construct()
	{
		parent::__construct();

		$this->can_delete = true;
		$this->can_download_to_browser = false;
		$this->can_download_to_file = true;
	}

	public function processPart($absolute_filename, $upload_as = null)
	{
		// Retrieve engine configuration data
		$config = AEFactory::getConfiguration();

		$accesskey	= trim( $config->get('engine.postproc.dreamobjects.accesskey', '') );
		$secret		= trim( $config->get('engine.postproc.dreamobjects.secretkey', '') );
		$usessl		= $config->get('engine.postproc.dreamobjects.usessl', 0) == 0 ? false : true;
		$bucket		= $config->get('engine.postproc.dreamobjects.bucket', '');
		$directory	= $config->get('volatile.postproc.directory', null);
		$lowercase	= $config->get('engine.postproc.dreamobjects.lowercase', 1);
		if(empty($directory)) $directory	= $config->get('engine.postproc.dreamobjects.directory', 0);

		// Sanity checks
		if(empty($accesskey))
		{
			$this->setError('You have not set up your DreamObjects Access Key');
			return false;
		}

		if(empty($secret))
		{
			$this->setError('You have not set up your DreamObjects Secret Key');
			return false;
		}

		if(empty($bucket))
		{
			$this->setError('You have not set up your DreamObjects Bucket');
			return false;
		} else {
			// Remove any slashes from the bucket
			$bucket = str_replace('/', '', $bucket);
			if($lowercase) {
				$bucket = strtolower($bucket);
			}
		}

		// Create an S3 instance with the required credentials
		$s3 = AEUtilAmazons3::getInstance($accesskey, $secret, $usessl);
		$s3->defaultHost = 'objects.dreamhost.com';

		// If we are here, we'll have to start uploading the file. Let's prepare ourselves for that.
		// Fix the directory name, if required
		if(!empty($directory))
		{
			$directory = trim($directory);
			$directory = ltrim( AEUtilFilesystem::TranslateWinPath( $directory ) ,'/');
		}
		else
		{
			$directory = '';
		}

		// Parse tags
		$directory = AEUtilFilesystem::replace_archive_name_variables($directory);
		$config->set('volatile.postproc.directory', $directory);

		// Calculate relative remote filename
		$filename = empty($upload_as) ? basename($absolute_filename) : $upload_as;
		if( !empty($directory) && ($directory != '/') ) $filename = $directory . '/' . $filename;

		// Store the absolute remote path in the class property
		$this->remote_path = $filename;

		// Do we have to upload in one go or do a multipart upload instead?
		$filesize = @filesize($absolute_filename);
		AEUtilLogger::WriteLog(_AE_LOG_DEBUG, "DreamObjects -- Uploading ".basename($absolute_filename));
		// Legacy single part uploads
		$result = $s3->putObject(
			AEUtilAmazons3::inputFile( $absolute_filename, false ),		// File to read from
			$bucket,													// Bucket name
			$filename,													// Remote relative filename, including directory
			AEUtilAmazons3::ACL_PRIVATE,								// ACL (bucket owner has full control, file owner gets full control)
			array(),													// Meta headers
			// Other request headers
			array()
		);

		// Return the result
		$this->propagateFromObject( $s3 );
		return $result;
	}

	/**
	 * Implements object deletion
	 *
	 * @see backend/akeeba/abstract/AEAbstractPostproc#delete($path)
	 */
	public function delete($path)
	{
		// Retrieve engine configuration data
		$config = AEFactory::getConfiguration();

		$accesskey	= trim( $config->get('engine.postproc.dreamobjects.accesskey', '') );
		$secret		= trim( $config->get('engine.postproc.dreamobjects.secretkey', '') );
		$usessl		= $config->get('engine.postproc.dreamobjects.usessl', 0) == 0 ? false : true;
		$bucket		= $config->get('engine.postproc.dreamobjects.bucket', '');

		// Sanity checks
		if(empty($accesskey))
		{
			$this->setError('You have not set up your DreamObjects Access Key');
			return false;
		}

		if(empty($secret))
		{
			$this->setError('You have not set up your DreamObjects Secret Key');
			return false;
		}

		if(empty($bucket))
		{
			$this->setError('You have not set up your DreamObjects Bucket');
			return false;
		} else {
			// Remove any slashes from the bucket
			$bucket = str_replace('/', '', $bucket);
			if($lowercase) {
				$bucket = strtolower($bucket);
			}
		}

		// Create an S3 instance with the required credentials
		$s3 = AEUtilAmazons3::getInstance($accesskey, $secret, $usessl);
		$s3->defaultHost = 'objects.dreamhost.com';

		// Delete the file
		$result = $s3->deleteObject( $bucket, $path );

		// Return the result
		$this->propagateFromObject( $s3 );
		return $result;
	}

	public function downloadToFile($remotePath, $localFile, $fromOffset = null, $length = null)
	{
		// Retrieve engine configuration data
		$config = AEFactory::getConfiguration();

		$accesskey	= trim( $config->get('engine.postproc.dreamobjects.accesskey', '') );
		$secret		= trim( $config->get('engine.postproc.dreamobjects.secretkey', '') );
		$usessl		= $config->get('engine.postproc.dreamobjects.usessl', 0) == 0 ? false : true;
		$bucket		= $config->get('engine.postproc.dreamobjects.bucket', '');

		// Sanity checks
		if(empty($accesskey))
		{
			$this->setError('You have not set up your DreamObjects Access Key');
			return false;
		}

		if(empty($secret))
		{
			$this->setError('You have not set up your DreamObjects Secret Key');
			return false;
		}

		if(empty($bucket))
		{
			$this->setError('You have not set up your DreamObjects Bucket');
			return false;
		} else {
			// Remove any slashes from the bucket
			$bucket = str_replace('/', '', $bucket);
			if($lowercase) {
				$bucket = strtolower($bucket);
			}
		}

		// Create an S3 instance with the required credentials
		$s3 = AEUtilAmazons3::getInstance($accesskey, $secret, $usessl);
		$s3->defaultHost = 'objects.dreamhost.com';

		if($fromOffset && $length) {
			$toOffset = $fromOffset + $length - 1;
		} else {
			$toOffset = null;
		}
		$result = $s3->getObject($bucket, $remotePath, $localFile, $fromOffset, $toOffset);

		// Return the result
		$this->propagateFromObject( $s3 );
		return $result;
	}
}