(function($) {
	var $tiles = $('.tiles'),
		$handler = $('li', $tiles),
		isLoading = false,
		imagesFolder = 'images/biologie/mollusques/',
		apiURL = rootUrl + imagesFolder + 'mollusques.php',
		wPlugin = 'plugins/content/wookmark_gallery/wookmark_gallery/tmpl/wookmark_gallery_image1.php?src=',
		lastRequestTimestamp = 0,
		defaultThumbnailWith = 210,
		fadeInDelay = 1000, // TODO = increment this value with the number of images
		$window = $(window),
		$document = $(document),
		imagesTooltip = [],
		previousContentWidth = -1,
		currentFilter = null;
	
	// column-1 width = 100% (300px) -> 460px -> 730px -> 940px
	var responsiveData = [
		{ thumbWidth: 210, chart: false },
		{ thumbWidth: 184, chart: false },
		{ thumbWidth: 210, chart: false },
		{ thumbWidth: 210, chart: true }
	]

	function comparatorName(a, b)
	{
		return $(a).data('name') < $(b).data('name') ? -1 : 1;
	}
		
	function getContentWidth()
	{
		var contentWidthCssValue = $(".column-1").css('width');
		var contentWidth = parseInt(contentWidthCssValue.substr(0, contentWidthCssValue.length - 2));
		return contentWidth;
	}

	function getResponsiveData(width)
	{
		var contentWidth = width == null ? getContentWidth() : width;
		var dataIndex = -1;
		if (contentWidth < 460)
		{
			dataIndex = 0;
		}
		else if (contentWidth < 730)
		{
			dataIndex = 1;
		}
		else if (contentWidth < 940)
		{
			dataIndex = 2;
		}
		else
		{
			dataIndex = 3;
		}
		
		if (dataIndex != -1)
		{
			return responsiveData[dataIndex];
		}
		else
		{
			return null;
		}
	}
	
	function getWookmarkThumbnailWidth()
	{
		var responsiveData = getResponsiveData();
		return responsiveData.thumbWidth;
	}

	// Prepare layout options.
	var defaultWookmarkOptions = {
		autoResize: true, // This will auto-update the layout when the browser window is resized.
		container: $('.tiles'), // Optional, used for some extra CSS styling
		offset: 5, // Optional, the distance between grid items
		itemWidth: defaultThumbnailWith, // Optional, the width of a grid item
		comparator: comparatorName
	};

	/**
	 * Refreshes the layout.
	 */

	function applyLayout($newImages, hasImages) {
		defaultWookmarkOptions.container.imagesLoaded(function()
		{
			// Destroy the old handler
			if ($handler.wookmarkInstance)
			{
				$handler.wookmarkInstance.clear();
			}

			$('#loaderCircle').hide();

			// Clear previous images and add new ones
			$tiles.append($newImages);

			if (hasImages)
			{
				$handler = $('li', $tiles);
				defaultWookmarkOptions.itemWidth = getWookmarkThumbnailWidth();
				$handler.wookmark(defaultWookmarkOptions);

				// Setup shadowbox links
				Shadowbox.clearCache();
				// Select all shadowbox links:
				var imgLinks = $(".tiles > li a.sblink");
				imgLinks.each(function() { var $imgLink = $(this); imagesTooltip[$imgLink.attr('id')] = $imgLink.attr('title'); });
				imgLinks.sort(function(a, b) {
					return $(a).attr('data-name').localeCompare($(b).attr('data-name'));
				});
				Shadowbox.setup(imgLinks);
				
				imgLinks.tipsy({
					gravity: 's',
					html: true,
					delayIn: 0,
					delayOut: 0,
					offset: 8,
					opacity: 1,
					fade: true,
					title: function() { return "Agrandir l'image"; }
				});
				
				var articleLinks = $(".tiles > li a.artlink");
				articleLinks.tipsy({
					gravity: 's',
					html: true,
					delayIn: 0,
					delayOut: 0,
					offset: 8,
					opacity: 1,
					fade: true,
					title: function() { return "Voir les détails"; }
				});

				// Set opacity for each new image at a random time
				$newImages.each(function()
				{
					var $self = $(this);
					window.setTimeout(function() {
							//$self.css('opacity', '1'); // --> Issue with filtering
						},
						Math.random() * fadeInDelay);
				});
			}
			else
			{
				$tiles.css("height", 100);
			}
		});
	};

	/**
	 * Loads data from the API.
	 */

	function loadData(action, family) {

		if (action == 'filter')
		{
			isLoading = true;
			$tiles.empty();
			$('#loaderCircle').show();
			currentFilter = family;
		}		

		$.ajax({
			url: apiURL,
			dataType: 'json',
			data: {
				action: action,
				filter: family,
				width: getWookmarkThumbnailWidth()
			},
			success: action == 'filter' ? onLoadData : initDependencyChart
		});
		
	};

	/**
	 * Receives data from the API, creates HTML for images and updates the layout
	 */

	function onLoadData(response) {
		isLoading = false;

		// Create HTML for the images.
		var html = '';
		var data = response.data;
		var length = data.length;
		var image, opacity;

		alphabeticalData = buildInitiaAlphabeticalData();
		var thumbnailWith = getWookmarkThumbnailWidth();
		
		if (length > 0)
		{
			for (var i = 0; i < length; i++)
			{
				image = data[i];
				var imageFilePath = rootUrl + imagesFolder + image.img;
				
				var categoryAndItem = image.cat.split('|');
				var category = categoryAndItem[0];
				var item = categoryAndItem[1];

				var articleLink = '<a class=\'artlink\' href=\'javascript:routeArticle(' + image.id + ',' + category + ',' + item + ')\'>';
				var articleLinkEncoded = articleLink.replace('"', '\\"').replace('<', '&lt;').replace('>','&gt;');
				
				var imgLinkId = "imgLink" + i;
				
				html += "<li data-name='" + image.desc + "' data-filter-class='[\"" + image.desc.charAt(0) + "\"]'>";
				html += '<div class="wmcontainer">';
				html += '<div class="wmdesc">' + image.desc + '</div>';
				html += '<div class="wmbg"><div class="wmlinks">';
				html += '<a class="sblink" rel="shadowbox[mollusques]" href="' + imageFilePath + '"';
				html += ' id="' + imgLinkId + '" data-name="' + image.desc + '"';
				html += ' title="' + articleLinkEncoded + image.desc + '&lt;/a&gt;">';
				html += '<i class="icon-search" style="font-size: 30px;"></i>';
				html += '</a>';
				if (image.id.length > 0)
				{
					html += '&nbsp;&nbsp;&nbsp;';
					html += articleLink;
					html += '<i class="icon-link-ext" style="font-size: 30px"></i>';
					html += '</a>';
				}
				html += '</div></div>';
				html += '<img src="' + rootUrl + wPlugin + imageFilePath;
				html += '&amp;w=' + thumbnailWith + '&amp;q=100" width="' + thumbnailWith + '" height="' + image.height + '">';
				html += '</div>';
				html += '</li>';
				
				// Update alphabetical data
				var alphabetPos = alphabet.indexOf(image.desc.charAt(0));
				alphabeticalData[alphabetPos]++;
			}
		}
		else
		{
			html += '<li style="width: 100%;"><table style="height: 100px; margin: auto"><tr>';
			html += '<td><i class="icon-emo-displeased" style="font-size: 50px"></i></td>';
			html += '<td style="vertical-align: middle; font-size: 20px;">Désolé, nous n\'avons pas d\'image qui corresponde à votre sélection</td>';
			html += '</tr></table></li>';
		}

		var $newImages = $(html);

		// Apply layout.
		applyLayout($newImages, (length > 0));
		
		// Update Alhabetical Filter
		updateAlphabeticalFilter(alphabeticalData);
		
	};

	var data = {
		"id": "all",
		"name": "Mollusques",
		"desc": "",
		"layer": 0,
		"current": true,
		"children": [{
			"id": "aplacophore",
			"name": "Aplacacophores",
			"desc": "",
			"layer": 1
		}, {
			"id": "bivalve",
			"desc": "Aussi appelés Lamellibranches, leur corps est recouvert d'une coquille constituée de deux parties distinces, reliées l'une à l'autre et qui peuvent s'ouvrir ou se fermer.<br><i class='icon-right-hand'></i>Environ 20 000 espèces<br><i class='icon-right-hand'></i>Huîtres, Moules, Palourdes, ...",
			"name": "Bivalves",
			"layer": 1
		}, {
			"id": "cephalopode",
			"name": "Céphalopodes",
			"desc": "Céphalopode vient du Grec Kephalê (tête) et Podos (pied) et signifie donc \"Pied placé en avant de la tête\". Ces mollusques sont munis d'une couronne de tentacules - généralement huit ou dix - entourant la bouche qui est équipée d'un bec de perroquet particulièrement puissant.<br><i class='icon-right-hand'></i>Environ 700 espèces<br><i class='icon-right-hand'></i>Poulpes, Seiches, Calamars",
			"layer": 1,
			"children": [{
				"id": "dibranchiaux",
				"name": "Dibranchiaux",
				"desc": "Une paire de branchies",
				"layer": 2,
				"children": [{
					"id": "decapode",
					"name": "Décapodes",
					"desc": "Dix tentacules autour de la bouche<br><i class='icon-right-hand'></i>Calamars, Seiches, Sépioles",
					"layer": 3
				}, {
					"id": "octopode",
					"name": "Octopodes",
					"desc": "Huit tentacules autour de la bouche<br><i class='icon-right-hand'></i>Poulpes, Argonautes",
					"layer": 3
				}, ]
			}, {
				"id": "tetrabranchiaux",
				"name": "Tétrabranchiaux",
				"desc": "2 paires de branchies<br><i class='icon-right-hand'></i>Le Nautile",
				"layer": 2
			}]
		}, {
			"id": "gasteropode",
			"name": "Gastéropodes",
			"desc": "Le terme Gastéropode vient du Grec Gastêr (ventre) et Podos (pied) et souligne donc le fait que les viscères de l'animal reposent sur un large pied musculeux.<br><i class='icon-right-hand'></i>Environ 80 000 espèces<br><i class='icon-right-hand'></i>Escargots, Limaces, ...",
			"layer": 1,
			"children": [{
				"id": "opistobranche",
				"name": "Opistobranches",
				"desc": "Le terme Opisthobranche provient du Grec Opistho (en arrière) et Branch (branchie), ce qui signifie que les branchies sont situées à l'arrière du coeur.<br><i class='icon-right-hand'></i>Les Limaces",
				"layer": 2,
				"children": [{
					"id": "anaspide",
					"name": "Anaspidea",
					"desc": "<i class='icon-right-hand'></i>Les Lièvres de mer",
					"layer": 3
				}, {
					"id": "cephalaspide",
					"name": "Cephalaspidea",
					"desc": "<i class='icon-right-hand'></i>Les Limaces à tête renforcée",
					"layer": 3
				}, {
					"id": "gymnosomata",
					"name": "Gymnosomata",
					"desc": "<i class='icon-right-hand'></i>Limaces pélagiques",
					"layer": 3
				}, {
					"id": "notaspide",
					"name": "Notaspidea",
					"desc": "<i class='icon-right-hand'></i>Limaces aux branchies latérales",
					"layer": 3
				}, {
					"id": "nudibranche",
					"name": "Nudibranches",
					"desc": "Limaces aux branchies à nu, qui ne possèdent plus de coquille. Leurs branchies sont externes, disposées sur le corps de différentes manières selon les espèces et parfois rétractables.",
					"layer": 3,
					"children": [{
						"id": "aeolidien",
						"name": "Aéolidiens",
						"desc": "Ils ont un corps élancé, affiné vers l'arrière, portant sur le dos des touffes ou rangées de papilles dorsales, les cerata. La tête porte deux rhinophores et deux tentacules labiaux bucaux. Pour se défendre, ils stockent les cellules urticantes de leurs proies (cnidaires) à l'extrémité des cerata, dans les cnidosacs.",
						"layer": 4
					}, {
						"id": "arminace",
						"name": "Arminacés",
						"desc": "Leur dos présente généralement des stries ou fines crêtes longitudinales. Les branchies peuvent être absentes ou présentes sur les côtés de l'animal, souvent couvertes par le manteau.",
						"layer": 4
					}, {
						"id": "dendronotace",
						"name": "Dendronotacés",
						"desc": "Nudibranches limaciformes parfois très grands (> 50 cm). Des paires d'appendices simples ou ramifiés (en forme de polypes), à fonction respiratoire, sont en général présents le long de la bordure du dos. Un voile oral, frangé ou lisse, surmonte la bouche. Les rhinophores rétractiles possèdent de très grands fourreaux, caractéristiques de ce groupe.",
						"layer": 4
					}, {
						"id": "doridien",
						"name": "Doridiens",
						"desc": "Ils possèdent 2 rhinophores à l'avant et un panache branchial à l'arrière, autour de l'anus, qui peut se rétracter (Crytptobranches) ou pas (Phanérobranches) selon les espèces.",
						"layer": 4
					}]
				}, {
					"id": "sacoglosse",
					"name": "Sacoglosses",
					"desc": "<i class='icon-right-hand'></i>Limaces suceuses de sève<br><i class='icon-right-hand'></i>Thuridille et Elysia",
					"layer": 3
				}, {
					"id": "thecosomata",
					"name": "Thecosomata",
					"desc": "<i class='icon-right-hand'></i>Limaces pélagiques",
					"layer": 3
				}]
			}, {
				"id": "prosobranche",
				"name": "Prosobranches",
				"desc": "Le terme Prosobranche provient du Grec Proso (en avant) et Branch (branchie), ce qui signifie que les branchies sont situées à l'avant du coeur. Ils possèdent tous une coquille, qui a donc subi une torsion entraînant le déplacement des branchies à l'avant du coeur.<br><i class='icon-right-hand'></i>Ormeaux, Patelles, Porcelaines, ...",
				"layer": 2
			}]
		}, {
			"id": "monoplacophore",
			"desc": "Un seul genre vivant<br><i class='icon-right-hand'></i>Neopilina",
			"name": "Monoplacophores",
			"layer": 1
		}, {
			"id": "polyplacophore",
			"desc": "<i class='icon-right-hand'></i>Les Chitons",
			"name": "Polyplacophores",
			"layer": 1
		}, {
			"id": "scaphopode",
			"desc": "<i class='icon-right-hand'></i>Les Dentales",
			"name": "Scaphopodes",
			"layer": 1
		}]
	};
	
	var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

	var customNodes = null,
		imgCount = null,
		alphabeticalData = null,
		currentSVGNode = null,
		selectedAlphabeticalFilter = null,
		tmpNodes,
		label_w = 70,
		branch_w = 62,
		circleRadius = 13,
		circleSpacing = 7,
		layer_wider_label = new Array(),
		depencencyChart,
		nodeColor = "#00B300",//"#269926",
		emptyNodeColor = "#7DB37D";//"#6B996B",
		selectedNodeColor = "#0081C1",
		textColor = "#ffffff",
		emptyTextColor = "#dddddd",
		tooltips = [];

	function buildInitiaAlphabeticalData()
	{
		var data = [];
		for (var i = 0; i < 26; i++)
		{
			data[i] = 0;
		}
		return data;
	}
	
	function alphabeticalFilter(charPos)
	{
		var charFilter = alphabet.charAt(charPos);
		var wookmarkFilter = new Array();
		wookmarkFilter.push(charFilter);
		
		// New Fill for selected filter
		if (selectedAlphabeticalFilter != null)
		{
			selectedAlphabeticalFilter.attr("fill", nodeColor);
		}
		
		selectedAlphabeticalFilter = d3.select("#alphabetical").select("#alphabetical-" + charPos);
		selectedAlphabeticalFilter.attr("fill", selectedNodeColor);
		
		// Filter wookmark gallery
		$handler.wookmarkInstance.filter(wookmarkFilter);
		
		// Setup shadowbox links
		Shadowbox.clearCache();
		// Select all shadowbox links:
		var links = $(".tiles > li:not(.inactive) a.sblink");
		links.each(function() { var $imgLink = $(this); $imgLink.attr('title', imagesTooltip[$imgLink.attr('id')]); });
		
		Shadowbox.setup(links);
		
	}
	
	// Loading is true when onResize is called when the page is loading
	function onResize(loading)
	{		
		var prevResponsiveData = getResponsiveData(previousContentWidth);
		var newResponsiveData = getResponsiveData();

		var contentWidth = getContentWidth();
		previousContentWidth = contentWidth;
		
		var prevThumbWidth = prevResponsiveData.thumbWidth;
		var newThumbWidth = newResponsiveData.thumbWidth;
		
		var prevIsChart = prevResponsiveData.chart;
		var newIsChart = newResponsiveData.chart;
		
		// We don't switch if the page is just loading
		var switching = loading == true ? false : true;
		var reloadData = currentFilter != null && prevThumbWidth != newThumbWidth;
		
		// Redraw chart if needed
		if (loading == true || prevIsChart != newIsChart)
		{
			if (newIsChart)
			{
				configureChart(switching);
				if (!reloadData)
				{
					// updateAlphabeticalFilter is called in onLoadData
					// Update Alhabetical Filter
					updateAlphabeticalFilter(alphabeticalData);
				}
			}
			else
			{
				configureSelect(switching);
			}
		}
		
		// Reload images if needed
		if (reloadData)
		{
			// Thumbnail width have changed...
			// Reload images
			loadData('filter', currentFilter);
		}		
	}
	
	function formatSelectElement(item)
	{
		var count = imgCount[item.id];
		if (count == null) count = 0;
		return item.name + "  (" +  count + ")";
	}
	
	function configureSelect(switching)
	{				
		if (switching)
		{
			d3.selectAll("#filters svg").remove();
		}
		var filters = $("#filters");
		filters.empty();
		filters.css("display", "none");
	
		var alphabetical = $("#alphabetical");
		alphabetical.empty();
		alphabetical.css("display", "none");
		
		var $initiaTip = $("#initialTip");
		if ($initiaTip)
		{
			$initiaTip.remove();
			$(".tiles").css("height","60px");
		}
		
		// show the div container for the select element
		$("#selectContainer").css("display","block");
		
		// Setuo the select element
		$("#selectmollusque").select2({
			placeholder: "Sélectionnez une famille de mollusques...",
			data: { results: data.children, text: 'name' },
			formatSelection: formatSelectElement,
			formatResult: formatSelectElement
		});
		$("#selectmollusque").on("change", function(e) {
			loadData('filter', e.val);
		});
		
		if (currentFilter != null)
		{
			$("#selectmollusque").select2("val", currentFilter);
		}
	}
	
	// switch is true if we switch from select to chart
	function configureChart(switching)
	{
		// Destroy the select element
		if (switching)
		{
			// Remove the event handler
			$("#selectmollusque").unbind("change");
			$("#selectmollusque").select2("destroy");
		}
		// Hide the select element
		$("#selectContainer").css("display","none");
	
		// Show the chart and alphabetical filter container
		$("#filters").css("display", "block");
		$("#alphabetical").css("display","block");

		chartActive = true;
						
		customNodes = new Array();
				
		tmpNodes = d3.layout.tree().size([500, 400]).nodes(data);

		// Create a svg canvas
		depencencyChart = d3.select("#filters").append("svg:svg")
			.attr("width", 860)
			.attr("height", 500)
			.append("svg:g");

		var fakeTxtBox = depencencyChart.append("svg:text")
			.attr("id", "fakeTXT")
			.attr("text-anchor", "right")
			.text(data.name);

		layer_wider_label[0] = fakeTxtBox.node().getComputedTextLength();
		depencencyChart.select("#fakeTXT").remove();
		data.y = getNodeY(data.id);
		data.x = 0;
		data.depth = parseInt(data.layer);
		customNodes.push(data);
		prepareNodes(data.children);
		//align nodes.
		updateNodesXOffset()
		
		drawChart();
		
		$('svg text').tipsy({
			gravity: $.fn.tipsy.autoWE,
			html: true,
			delayIn: 0,
			delayOut: 0,
			offset: 8,
			opacity: 1,
			fade: true,
			title: function() {
				return tooltips[this.id];
			}
		});
		
		// Create Alphabetical filter buttons
		var gElements = d3.select("#alphabetical").append("svg:svg")
			.attr("width", 860)
			.attr("height", circleRadius * 2)
			.selectAll("g")
			.data(buildInitiaAlphabeticalData())
			.enter()
			.append("g")
			.attr("transform", function (d,i) { return "translate(" + ( i * ( circleRadius * 2 + circleSpacing) + 4 ) + ",0)"})
			.attr("class", "inactivenode");
					
		gElements.append("circle")
			.attr("id", function(d,i) { return "alphabetical-" + i; })
			.attr("cy", circleRadius)
			.attr("cx", circleRadius)
			.attr("r", circleRadius)
			.attr("fill", emptyNodeColor)
			.on("click", function(d,i) {
				if (d > 0) alphabeticalFilter(i);
			});
		
		gElements.append("svg:text")
			.attr("class", "alphabeticalfilter")
			.attr("x", circleRadius)
			.attr("y", circleRadius + 6)
			.attr("text-anchor", "middle")
			.attr("fill", emptyTextColor)
			.text(function(d,i) { return alphabet.charAt(i); })
			.on("click", function(d,i) {
				if (d > 0) alphabeticalFilter(i);
			});

			$('svg text.alphabeticalfilter').tipsy({
				gravity: 's',
				html: true,
				delayIn: 0,
				delayOut: 0,
				offset: 2,
				opacity: 1,
				fade: true
			});
	}
	
	function initDependencyChart(response) {
		
		imgCount = response.data;
		previousContentWidth = getContentWidth();
				
		$( window ).resize(onResize);
		
		onResize(true);
	}

	function updateAlphabeticalFilter(alphabeticalData)
	{
		selectedAlphabeticalFilter = null;
		
		var gElements = d3.select("#alphabetical")
			.selectAll("g")
			.data(alphabeticalData)
			.attr("class", function (d) { return d > 0 ? "node" : "inactivenode"; } );	
		
		gElements.select("circle")
			.attr("fill", function (d) { return d > 0 ? nodeColor : emptyNodeColor; });
		
		gElements.select("text")
			.attr("fill", function (d) { return d > 0 ? textColor : emptyTextColor; })
			.attr("title", function (d) { return d == 0 ? "" : d + " espèce" + (d > 1 ? "s" :""); } );
	}
	
	function updateNodesXOffset() {
		var x_offsets = new Array();
		x_offsets[0] = 0;
		customNodes.forEach(function(node) {
			node.x = 0;
			if (node.layer > 0) {
				node.x = x_offsets[node.layer - 1] + layer_wider_label[node.layer - 1] + branch_w;
				x_offsets[node.layer] = node.x;
			}
		});
	}

	function getNodeY(id) {
		var ret = 0;
		tmpNodes.some(function(node) {
			if (node.id === id) {
				//return x:d3.tree has a vertical layout by default.
				ret = node.x;
				return;
			}
		})
		return ret;
	}
	
	function prepareNodes(nodes) {
		nodes.forEach(function(node) {
			prepareNode(node);
			if (node.children) {
				prepareNodes(node.children);
			}
		});
	}

	function prepareNode(node) {
		node.y = getNodeY(node.id);
		//fake element to calculate labels area width.
		var fakeTxtBox = depencencyChart.append("svg:text")
			.attr("id", "fakeTXT")
			.attr("text-anchor", "right")
			.text(node.name);
		var this_label_w = fakeTxtBox.node().getComputedTextLength();
		depencencyChart.select("#fakeTXT").remove();
		if (layer_wider_label[node.layer] == null) {
			layer_wider_label[node.layer] = this_label_w;
		} else {
			if (this_label_w > layer_wider_label[node.layer]) {
				layer_wider_label[node.layer] = this_label_w;
			}
		}
		//x will be set
		node.depth = parseInt(node.layer);
		customNodes.push(node);
	}


	function customSpline(d) {
		var p = new Array();
		p[0] = d.source.x + "," + d.source.y;
		p[3] = d.target.x + "," + d.target.y;
		var m = (d.source.x + d.target.x) / 2
		p[1] = m + "," + d.source.y;
		p[2] = m + "," + d.target.y;
		//This is to change the points where the spline is anchored
		//from [source.right,target.left] to [source.top,target.bottom]
		//                var m = (d.source.y + d.target.y)/2
		//                p[1] = d.source.x + "," + m;
		//                p[2] = d.target.x + "," + m;
		return "M" + p[0] + "C" + p[1] + " " + p[2] + " " + p[3];
	}
	
	function getNodeColor(nodeId)
	{
		return imgCount[nodeId] > 0 ? nodeColor : emptyNodeColor;
	}
	
	function getTextColor(nodeId)
	{
		return imgCount[nodeId] > 0 ? textColor : emptyTextColor;
	}

	function getRectNodeId(nodeId)
	{
		return nodeId + "-rect";
	}
	
	function getTextNodeId(nodeId)
	{
		return nodeId + "-text";
	}
	
	function selectFilter(clickedTextNode) {
		
		// Get the bound data from the D3 node
		var node = clickedTextNode.__data__;

		if (node.id == 'all') return;
				
		if (currentFilter != null)
		{
			depencencyChart.select("#" + getRectNodeId(currentFilter)).attr("fill", getNodeColor(currentFilter));
		}
		
		depencencyChart.select("#" + getRectNodeId(node.id)).attr("fill", selectedNodeColor);
		
		loadData('filter', node.id);
	}

	function drawChart() {
		
		customNodes.forEach(function(node) {

			var nodeSVG = depencencyChart.append("svg:g")
				.attr("transform", "translate(" + node.x + "," + node.y + ")")
				.attr("class", (node.id != "all" && imgCount[node.id] > 0) ? "node" : "inactivenode");
			
			var txtBoxId = getTextNodeId(node.id);
			var rectBoxId = getRectNodeId(node.id);
				
			var txtBox = nodeSVG.append("svg:text")
				.data([node])
				.attr("id", txtBoxId)
				.attr("dx", 10)
				.attr("dy", 4)
				.attr("fill", getTextColor(node.id))
				.text(node.name)
				.on("click", function() {
					if (imgCount[node.id] > 0) selectFilter(this);
				});
							
			tooltips[txtBoxId] = node.desc;

			var txtW = txtBox.node().getComputedTextLength();
			
			nodeSVG.insert("rect", "text")
				.attr("id", rectBoxId)
				.attr("fill", currentFilter == node.id ? selectedNodeColor : getNodeColor(node.id))
				.attr("width", txtW + 20)
				.attr("height", "27")
				.attr("y", "-15")
				.attr("x", "0")
				.attr("rx", 4)
				.attr("ry", 4);
									
			if (node.children) {
				node.x = node.x + txtW + 20;
				//prepare links;
				var links = new Array();
				node.children.forEach(function(child) {
					var st = new Object();
					st.source = node;
					//                        st.parent = node;
					st.target = child;
					st.warning = child.warning;
					links.push(st);
				});

				//draw links (under nodes)
				depencencyChart.selectAll("pathlink")
					.data(links)
					.enter().insert("svg:path", "g")
					.attr("class", function(d) {
						return d.warning === "true" ? "link warning" : "link"
					})
					.attr("d", customSpline)
			}
		});
	}	
	
	loadData('count', '');
	
})(jQuery);


