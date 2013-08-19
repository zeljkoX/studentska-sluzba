define(['hogan'],function(Hogan) {

  this["Templates"] = this["Templates"] || {};

  this["Templates"]["index"] = new Hogan.Template(function(c,p,i){var _=this;_.b(i=i||"");_.b("<div class=\"search-main\">");_.b("\n" + i);_.b("      <form class=\"form-search\">");_.b("\n" + i);_.b("      <input type=\"text\" class=\"input-xxlarge search-query\" placeholder=\"Broj indeksa, Ime Prezime, Predmet....\" autofocus>");_.b("\n" + i);_.b("      <button type=\"submit\" class=\"btn\"><i class=\"icon-search\"></i> Search</button>");_.b("\n" + i);_.b("</form>");_.b("\n" + i);_.b("    </div>");_.b("\n" + i);_.b("    <hr>");_.b("\n" + i);_.b("    <div class=\"row\">");_.b("\n" + i);_.b("        <div class=\"span4\">");_.b("\n" + i);_.b("      <div class=\"btn btn-block\" data-link=\"fakulteti\"><strong>Fakulteti</strong></div>");_.b("\n" + i);_.b("        </div>");_.b("\n" + i);_.b("        <div class=\"span4\">");_.b("\n" + i);_.b("         <div class=\"btn btn-block\" data-link=\"predmeti\"><strong>Predmeti</strong></div>");_.b("\n" + i);_.b("       </div>");_.b("\n" + i);_.b("        <div class=\"span4\">");_.b("\n" + i);_.b("          <div class=\"btn btn-block\" data-link=\"studenti\"><strong>Studenti</strong></div>");_.b("\n" + i);_.b("        </div>");_.b("\n" + i);_.b("      </div>");_.b("\n" + i);_.b("\n" + i);_.b("      <div class=\"row\">");_.b("\n" + i);_.b("        <div class=\"span4\">");_.b("\n" + i);_.b("         <div class=\"btn btn-block\" data-link=\"ispiti\"><strong>Ispiti</strong></div>");_.b("\n" + i);_.b("        </div>");_.b("\n" + i);_.b("        <div class=\"span4\">");_.b("\n" + i);_.b("         <div class=\"btn btn-block\" data-link=\"dokumenti\"><strong>Dokumenti</strong></div>");_.b("\n" + i);_.b("       </div>");_.b("\n" + i);_.b("        <div class=\"span4\">");_.b("\n" + i);_.b("          <div class=\"btn btn-block\" data-link=\"podesavanja\"><strong>Podesavanja</strong></div>");_.b("\n" + i);_.b("        </div>");_.b("\n" + i);_.b("      </div>");return _.fl();;});

  this["Templates"]["lokacija"] = new Hogan.Template(function(c,p,i){var _=this;_.b(i=i||"");_.b("  <div class=\"lokacija\">");_.b("\n" + i);_.b("            <div class=\"row breadcrumb-nav\">");_.b("\n" + i);_.b("              <ul class=\"breadcrumb\">");_.b("\n" + i);_.b("                <li>");_.b("\n" + i);_.b("                  <a href=\"#\">Pocetna</a> <span class=\"divider\">/</span>");_.b("\n" + i);_.b("                </li>");_.b("\n" + i);_.b("                <li>");_.b("\n" + i);_.b("                  <a href=\"#\">Fakulteti</a> <span class=\"divider\">/</span>");_.b("\n" + i);_.b("                </li>");_.b("\n" + i);_.b("                <li class=\"active\">");_.b("\n" + i);_.b("                  FIT");_.b("\n" + i);_.b("                </li>");_.b("\n" + i);_.b("              </ul>");_.b("\n" + i);_.b("              <button class=\"btn btn-success\" type=\"submit\"><i class=\"icon-plus-sign icon-white\"></i> Studijski program</button>");_.b("\n" + i);_.b("            </div>");_.b("\n" + i);_.b("          </div>");return _.fl();;});

  this["Templates"]["naslov"] = new Hogan.Template(function(c,p,i){var _=this;_.b(i=i||"");_.b("< div class = \"row\" > ");_.b("\n" + i);_.b("< h3 > Fakultet za Informacione tehnologije < /h3>");_.b("\n" + i);_.b("</div >");return _.fl();;});

  this["Templates"]["statistika"] = new Hogan.Template(function(c,p,i){var _=this;_.b(i=i||"");_.b("<div class=\"row\">");_.b("\n" + i);_.b("<div class=\"navbar\">");_.b("\n" + i);_.b("<div class=\"navbar-inner statistika\">");_.b("\n" + i);_.b(" <p>Studijski programi: <span class=\"badge badge-info\">8</span></p>");_.b("\n" + i);_.b("<p>Broj studentata: <span class=\"badge badge-info\">8</span></p>");_.b("\n" + i);_.b("</div>");_.b("\n" + i);_.b("</div>");_.b("\n" + i);_.b("</div>");return _.fl();;});

  this["Templates"]["stranica"] = new Hogan.Template(function(c,p,i){var _=this;_.b(i=i||"");_.b("<div class=\"naslov\">");_.b("\n" + i);_.b("</div>");_.b("\n" + i);_.b("<div class=\"stat\">");_.b("\n" + i);_.b("</div>");_.b("\n" + i);_.b("<div class=\"lokacija\">");_.b("\n" + i);_.b("</div>");_.b("\n" + i);_.b("<div class=\"podstranica\">");_.b("\n" + i);_.b("</div>");return _.fl();;});

  this["Templates"]["test"] = new Hogan.Template(function(c,p,i){var _=this;_.b(i=i||"");_.b("Ime : ");_.b(_.v(_.f("zeljko",c,p,0)));_.b(" ");_.b("\n" + i);_.b("Prezime : ");_.b(_.v(_.f("Markovci",c,p,0)));return _.fl();;});

  return this["Templates"];
});