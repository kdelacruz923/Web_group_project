//IIFE
(function()
{

    function Start()
    {
        console.log("App Started!");

       $("a.delete").on("click", function(event)
       {
            if(!confirm("Are you sure?"))
            {
                event.preventDefault();
               // location.href = "/product-list";
               location.href = "/book-list";
            }
       });
    }

    window.addEventListener("load", Start);

})();