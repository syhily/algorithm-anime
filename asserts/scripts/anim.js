var cur = 0;
var id;
var view = "anim";
var anim_mode = "run";
var ncolumns = 2;
var frameWidth = 280;
var frameHeight = 200;

// 2.0 start -------------------------------
var baseAPI = 'https://studio.u-aizu.ac.jp/aida/api/';
var samples;
var callDescription = function () {
    $('#messageServer').hide();
    $('#messageDescription').hide();
    $('#sampleSelector').html('');
    $.ajax({
        type: 'get',
        url: baseAPI + 'description/ja/' + algorithmId,
        scriptCharset: 'utf-8',
        contentType: 'application/JSON',
        dataType: 'JSON',
//	xhrFields: { withCredentials: true },
        success: function (data) {
            if (data.status == 'failed') {
                $('#messageServer').text(msgNotSupported);
                $('#messageServer').slideDown();
                $('#createButton').hide();
            } else {
                $('#createButton').show();
                $('#messageDescription').html(data.description);
                $('#messageDescription').slideDown();
                samples = data.samples;
                $('#userInputArea').val(samples[0]);
                $.each(data.samples, function (index, value) {
                    $('#sampleSelector').append('<button class="selectButton" onclick="selectSample(' + index + ')">' + (index + 1) + '</button>');
                })
            }
        },
        error: function (data) {
            $('#messageServer').show();
            $('#messageServer').text(msgServerError);
        }
    });
}

var selectSample = function (idx) {
    $('#userInputArea').val(samples[idx]);
}

var callAnim = function () {
    $('#messageServer').slideDown();
    $('#messageServer').text(msgProcessing);
    var payload = {
        algorithmId: algorithmId,
        userInput: $('#userInputArea').val()
    };

    $.ajax({
        type: 'post',
        url: baseAPI + 'explain/ja',
        data: JSON.stringify(payload),
        scriptCharset: 'utf-8',
        contentType: 'application/JSON',
        dataType: 'JSON',
//	xhrFields: { withCredentials: true },
        success: function (data) {
            if (data.status == 'success') {
                var xmlData;
                try {
                    xmlData = $.parseXML(data.content);
                    renderAnim(xmlData);
                    $(".popup").fadeOut();
                } catch (error) {
                    console.log(error);
                    $('#messageServer').text(msgNotDefined);
                }
            } else {
                $('#messageServer').show();
                $('#messageServer').text(msgInvalidInput);
            }
        },
        error: function (data) {
            console.log(data);
            $('#messageServer').text(msgServerError);
            $('.selectorTable').hide();
        }
    });
}

var renderAnim = function (xmlData) {
    svg = new Array();
    $("svg", xmlData).each(function () {
        var xmlString;
        xmlString = (new XMLSerializer()).serializeToString(this);
        svg.push(xmlString);
    })
    reload();
}

$(function () {
    $("#customButton").on("click", function () {
        // callDescription();
        $(".popup").addClass("show").fadeIn();
    });
    $("#createButton").on("click", function () {
        callAnim();
    });
    $("#cancelButton").on("click", function () {
        $(".popup").fadeOut();
    });
});

var reload = function () {
    var pro = "";
    for (var i = 0; i < svg.length; i++) {
        pro += "<td>&#9679;</td>";
    }
    document.getElementById("progress").innerHTML = pro;

    changeView("anim");
    changeMode("run");
    reset();
    run();
}
// 2.0 end

window.onload = function () {
    // callDescription(); // 2.0
    reload();          // 2.0

    document.getElementById("play").onmousedown = function () {
        if (anim_mode == "run") {
            changeMode("step");
            stop();
        } else if (anim_mode == "step") {
            changeMode("run");
            run();
        }
    };
    document.getElementById("next").onmousedown = function () {
        changeMode("step");
        clearInterval(id);
        forward();
    };
    document.getElementById("prev").onmousedown = function () {
        changeMode("step");
        clearInterval(id);
        backward();
    };

    document.getElementById("tile_view").onclick = function () {
        changeView("tile");
    }
    document.getElementById("anim_view").onclick = function () {
        changeView("anim");
    }
    document.getElementById("var_formula_view").onclick = function () {
        changeView("var_formula");
    }
    document.getElementById("space_view").onclick = function () {
        changeView("space");
    }

    document.getElementById("tile_1").onmousedown = function () {
        setTileView(1);
    }
    document.getElementById("tile_2").onmousedown = function () {
        setTileView(2);
    }
    document.getElementById("tile_3").onmousedown = function () {
        setTileView(3);
    }

    var parser = new DOMParser();
    var doc = parser.parseFromString(svg[0], "text/xml");
    var viewBox = doc.querySelector('svg').getAttribute('viewBox').split(/\s+|, /);
    frameWidth = viewBox[2];
    frameHeight = viewBox[3];
    changeSize();

    document.getElementById("variable").innerHTML = variable_content;
    document.getElementById("formula").innerHTML = formula_content;
};

window.onresize = function () {
    changeSize()
};

var changeSize = function () {
    var h = window.innerHeight - 152;
    var w = h * frameWidth / frameHeight;
    if (w > window.innerWidth) w = window.innerWidth - 8;
    document.getElementById('content').style.width = w;

    var g = h - document.getElementById('content').clientHeight;
    document.getElementById('anim_container').style.paddingTop = 60 + g / 2;
}

var stop = function () {
    clearInterval(id);
}

var run = function () {
    if (cur >= svg.length - 1) cur = 0;
    cur--;
    forward();
    clearInterval(id);
    id = setInterval(function () {
        forward();
    }, 2500);
}

var forward = function () {
    if (cur + 1 >= svg.length) {
        clearInterval(id);
        changeMode("step")
    } else {
        cur++;
        document.getElementById('content').innerHTML = svg[cur];
    }
    snap();
    changeSize();
}

var reset = function () {
    cur = 0;
    document.getElementById('content').innerHTML = svg[cur];
    snap();
}

var backward = function () {
    if (cur - 1 < 0) return;
    cur--;
    document.getElementById('content').innerHTML = svg[cur];
    snap();
}

var changeMode = function (m) {
    anim_mode = m;
    if (anim_mode == "step") {
        document.getElementById('play').classList.remove("icon_stop");
        document.getElementById('play').classList.add("icon_play");
    } else if (anim_mode == "run") {
        document.getElementById('play').classList.remove("icon_play");
        document.getElementById('play').classList.add("icon_stop");
    }
}

var snap = function () {
    for (var i = 0; i < svg.length; i++) {
        document.getElementById('progress').children[i].style.color = "#e0e0e0";
    }
    document.getElementById('progress').children[cur].style.color = "#88aaff";
}

var changeView = function (v) {
    view = v;
    if (view == "anim") {
        document.getElementById('anim_container').style.display = "block";
        document.getElementById('tile_container').style.display = "none";
        document.getElementById('var_formula_container').style.display = "none";
        document.getElementById('space_view').style.backgroundColor = "#ffffff";
        document.getElementById('var_formula_view').style.backgroundColor = "#eaeaea";
        changeSize();
    } else if (view == "tile") {
        document.getElementById('anim_container').style.display = "none";
        document.getElementById('tile_container').style.display = "block";
        document.getElementById('var_formula_container').style.display = "none";
        document.getElementById('space_view').style.backgroundColor = "#ffffff";
        document.getElementById('var_formula_view').style.backgroundColor = "#eaeaea";
        setTileView(1);
    } else if (view == "var_formula") {
        document.getElementById('anim_container').style.display = "none";
        document.getElementById('tile_container').style.display = "none";
        document.getElementById('var_formula_container').style.display = "block";
        document.getElementById('space_view').style.backgroundColor = "#eaeaea";
        document.getElementById('var_formula_view').style.backgroundColor = "#ffffff";
    } else if (view == "space") {
        document.getElementById('anim_container').style.display = "block";
        document.getElementById('tile_container').style.display = "none";
        document.getElementById('var_formula_container').style.display = "none";
        document.getElementById('space_view').style.backgroundColor = "#ffffff";
        document.getElementById('var_formula_view').style.backgroundColor = "#eaeaea";
    }
}

var setTileView = function (nc) {
    ncolumns = nc;

    var tile = "<table class=\"tiletable\">";
    if (ncolumns == 1) {
        for (var i = 0; i < svg.length; i++) {
            tile += "<tr><td class=\"tile_frame\">" + svg[i] + "</td></tr>";
            if (i + 1 == svg.length) continue;
            tile += "<tr><td style=\"text-align:center\"><b class=\"icon_next_vertical\"></b></td></tr>";
        }
    } else {
        for (var i = 0; i < svg.length; i++) {
            if (i % ncolumns == 0) tile += '<tr>';
            tile += "<td class=\"tile_frame\">" + svg[i] + "</td>";
            if (i + 1 == svg.length) {
                tile += "<td></td>";
            } else {
                tile += "<td class=\"tile_next\"><b class=\"icon_next\"></b></td>";
            }
            if ((i + 1) % ncolumns == 0) tile += '</tr>';
        }
        if (svg.length % ncolumns > 0) {
            for (var i = 0; i < (ncolumns - svg.length % ncolumns); i++) {
                tile += "<td></td><td></td>";
            }
            tile += "</tr>";
        }
    }

    document.getElementById('tileview').innerHTML = tile;
}

    
