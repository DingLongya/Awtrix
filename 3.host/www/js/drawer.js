const PixelArt = {
    currentBrush: $("#currentBrush"),
    currentColorType: 'custom',
    isColor: true,
    init() {
        this.initializeFormsAndMenu();
    },
    initializeFormsAndMenu() {
        const reset = $("#reset");
        const listItems = $("button");
        const userForm = $("#start");
        const colorPick = $("#colorPicker");
        reset.on('click', () => this.resetGrid());
        listItems.on('click', function() {
            $(this).siblings().removeClass("active");
            $(this).addClass("active");
            if (this.dataset.colors) {
                PixelArt.currentColorType = this.dataset.colors;
                if (PixelArt.currentColorType === 'custom') {
                    $('#colorInstructions').text('Choose your color');
                    colorPick.show();
                } else {
                    $('#colorInstructions').text('Random color enabled. Please proceed with your canvas :-)');
                    colorPick.hide();
                }
            } else {
                isDraggable = this.dataset.brush;
            }
        });
    },
    makeGrid() {
        const canvas = $("#pixel_canvas");
        canvas.find(".row-element").hide(200, () => $(this).remove());

        for (let row = 0; row < 8; row++) {
            canvas.append("<div class='row-element'></div>");
            for (let col = 0; col < 8; col++) {
                canvas.find(".row-element").last().prepend("<div class='element'></div>");
            }
        }
        this.colorGrid();
    },
    resetGrid() {
        $(".element").css('background-color', 'rgb(0,0,0)');
        $(".element").css('opacity', 1);
    },
    colorGrid() {
        const colorPick = $("#colorPicker");
        const element = $('.element');
        let isDraggable = false;

        colorPick.on('change', (event) => {
            $('i.square.icon').css('color', colorPick.val());
        });

        element.on('click', function(event) {
            const target = $(event.target);
            event.preventDefault();
            PixelArt.isColor = true;
            PixelArt.colorOrErase(target);
        });

        element.on('mousemove', function(event) {
            const target = $(event.target);
            event.preventDefault();
            if (isDraggable) {
                PixelArt.colorOrErase(target);
            }
        });

        element.on('mousedown', function(event) {
            event.preventDefault();
            isDraggable = true;
            switch (event.which) {
                case 1:
                    PixelArt.isColor = true;
                    PixelArt.currentBrush.addClass("paint brush").removeClass("eraser");
                    break;
                case 2:

                case 3:
                    PixelArt.isColor = false;
                    PixelArt.currentBrush.addClass("eraser").removeClass("paint brush");
                    break;
            }
        });

        element.on('contextmenu', function(event) {
            event.preventDefault();
            PixelArt.isColor = false;

            $(this).css('background-color', PixelArt.customColor());
        });

        $(document).on('mouseup', function(event) {
            event.preventDefault();
            PixelArt.currentBrush.addClass("paint brush").removeClass("eraser")
            isDraggable = false;
        });
    },

    randomColor() {
        if (this.isColor) {
            let red = Math.floor(Math.random() * 256);
            let green = Math.floor(Math.random() * 256);
            let blue = Math.floor(Math.random() * 256);
            return `rgb(${red},${green},${blue})`;
        } else {
            return 'rgb(0,0,0)';
        }
    },
    customColor() {
        if (this.isColor) {
            var color = $('.colorpicker-color').css("backgroundColor");
            return color;
        } else {
            return 'rgb(0,0,0)';
        }
    },
    colorOrErase(targetElement) {
        targetElement.css('opacity', 1);
        switch (this.currentColorType) {
            case 'custom':

                targetElement.css('background-color', PixelArt.customColor());
                break;
            case 'random':
                targetElement.css('background-color', PixelArt.randomColor());
                break;
        }
    }
}
PixelArt.makeGrid();
PixelArt.resetGrid();
PixelArt.init();

function get565Icon() {
    var Icon = [];
    var PixelMap = document.getElementsByClassName("element");
    for (let pixel of PixelMap) {
        var aPixel = pixel.style.backgroundColor;
        var parts = aPixel.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        var B = (parts[3] >> 3) & 0x1f;
        var G = ((parts[2] >> 2) & 0x3f) << 5;
        var R = ((parts[1] >> 3) & 0x1f) << 11;
        var rgb = (R | G | B);
        Icon.push(rgb);
    }
    return Icon;
}

function getRawIcon() {
    var Icon = [];
    var PixelMap = document.getElementsByClassName("element");
    for (let pixel of PixelMap) {
        var aPixel = pixel.style.backgroundColor;
        var parts = aPixel.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        var rgb = [parts[1], parts[2], parts[3]];
        Icon.push(rgb);
    }
    return Icon;
}


function setIcon(pixels) {
    var PixelMap = document.getElementsByClassName("element");
    for (i = 0; i < pixels.length; i++) {
        var c = pixels[i];
        var element = PixelMap[i];
        element.style.backgroundColor = fullColorHex(c[0], c[1], c[2]);
    }
}

function setOpacity() {
    var PixelMap = document.getElementsByClassName("element");
    for (let pixel of PixelMap) {
        pixel.style.transition = "opacity 1s";
        pixel.style.opacity = 0.4;
    }
}

var fullColorHex = function(r, g, b) {
    var red = rgbToHex(r);
    var green = rgbToHex(g);
    var blue = rgbToHex(b);
    return "#" + red + green + blue;
};

var rgbToHex = function(rgb) {
    var hex = Number(rgb).toString(16);
    if (hex.length < 2) {
        hex = "0" + hex;
    }
    return hex;
};

var frames = 0;

function newFrame() {
    var c = document.createElement('canvas');
    c.className = "framelistItem";
    c.width = 80;
    c.height = 80;
    c.id = "frame" + frames;
    frames++;
    document.getElementById("set").remove();
    document.getElementById("framelist").appendChild(c);

    var b = document.createElement('button');
    b.className = "btn btn-primary addFrame";
    b.id = "set"
    b.innerHTML = '<i class="material-icons">add_box</i>';
    b.setAttribute("onclick", "newFrame()");
    document.getElementById("framelist").appendChild(b);
    var PixelMap = document.getElementsByClassName("element");
    var count = 0
    var canv = c.getContext("2d");
    for (x = 0; x < 8; x++) {
        for (y = 0; y < 8; y++) {
            if (PixelMap[count].style.opacity < 1) {
                canv.fillStyle = "black";
                PixelMap[count].style.backgroundColor = "black";
            } else {
                canv.fillStyle = PixelMap[count].style.backgroundColor;
            }
            canv.fillRect(y * 10, x * 10, 10, 10);
            count++;
        }
    }
    setOpacity();
}