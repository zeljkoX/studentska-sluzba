(function ($) {

 var values = [parseInt($('#polozeno').data('val'),10),parseInt($('#nepolozeno').data('val'),10)],
  labels = ['## - polozeno','## - nepolozeno'];
    
    var r = Raphael("piechart"),
                     pie = r.piechart(200, 100, 60, values, { legend: labels, legendpos: "west", colors: ["#ff9900", "red"]});

                r.text(150, 10, "ISPITI").attr({ font: "20px sans-serif" });
                pie.hover(function () {
                    this.sector.stop();
                    this.sector.scale(1.1, 1.1, this.cx, this.cy);

                    if (this.label) {
                        this.label[0].stop();
                        this.label[0].attr({ r: 7.5 });
                        this.label[1].attr({ "font-weight": 800 });
                    }
                }, function () {
                    this.sector.animate({ transform: 's1 1 ' + this.cx + ' ' + this.cy }, 500, "bounce");

                    if (this.label) {
                        this.label[0].animate({ r: 5 }, 500, "bounce");
                        this.label[1].attr({ "font-weight": 400 });
                    }
                });
 $('table td a').tipsy({gravity: 'w',html: true } );
}(jQuery))