var proj_page = document.getElementById("projects");
var leav_page = document.getElementById("leaves");
var buil_page = document.getElementById("builds");

proj_page.onclick = function()
{
    loadPage("projects");
    proj_page.className = "active_link";
    leav_page.className = ""; 
    buil_page.className = "";
}
leav_page.onclick = function()
{
    loadPage("leaves");
    proj_page.className = "";
    leav_page.className = "active_link"; 
    buil_page.className = "";
}
buil_page.onclick = function()
{
    loadPage("builds");
    proj_page.className = "";
    leav_page.className = ""; 
    buil_page.className = "active_link";
}

function loadPage(e)
{
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() 
    {
        if(xhttp.readyState == 4 && xhttp.status== 200)
        {
            document.getElementById("main-context").innerHTML = xhttp.responseText;
        
        }
    };

    xhttp.open("POST", e, true);
    xhttp.send();
}