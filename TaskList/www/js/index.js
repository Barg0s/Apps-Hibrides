$(document).ready(function() {
    function saveTasks() {
        const tasks = [];
        $("#llistask .accordion-item").each(function() {
            tasks.push($(this).find(".tasca").text().trim());
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(tascaValue => {
            $("#llistask").append(`
                <li class="accordion-item">
                    <h3 class="tasca">${tascaValue}</h3>
                    <div class="accordion-content">
                        <button class="edit">editar</button>
                        <button class="eliminar">X</button>
                    </div>
                </li>
            `);
        });
    }

    function addTasca() {
        const tascaValue = $("#tasca").val().trim(); 
        $("#llistask").append(`
            <li class="accordion-item">
                <h3 class="tasca">${tascaValue}</h3>
                <div class="accordion-content">
                    <button class="edit">editar</button>
                    <button class="eliminar">X</button>
                </div>
            </li>
        `);
        saveTasks();
    }

    function editTasca() {
        const titoltasca = $(this).closest(".accordion-item").find(".tasca");
        const tasca_actual = titoltasca.text().trim();

        titoltasca.html(`<input type="text" class="edit-input" value="${tasca_actual}" />`);

        const input = titoltasca.find(".edit-input");
        input.focus();

        input.on('blur', function() {
            const updatedValue = input.val().trim();
            titoltasca.html(updatedValue);
            saveTasks();
        });
    }

    const dialog = $("#dialog-form").dialog({
        autoOpen: false,
        height: 400,
        width: 350,
        modal: true,
        buttons: {
            "Afegir tasca": addTasca,
            Cancelar: function() {
                dialog.dialog("close");
            }
        },
        close: function() {
            $("#dialog-form form")[0].reset();
        }
    });

    $("#create-tasca").button().on("click", function() {
        dialog.dialog("open");
    });

    $(document).on("click", ".eliminar", function() {
        $(this).closest(".accordion-item").remove();
        saveTasks();
    });

    $(document).on("click", ".edit", function() {
        editTasca.call(this); 
    });

    loadTasks();
});
