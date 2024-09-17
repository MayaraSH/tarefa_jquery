$(document).ready(function() {
    $('#tarefas-executar').submit(function(event) {
        event.preventDefault(); 

        const descricaoTarefa = $('#descricao-tarefa').val();
        const prazoTarefa = $('#prazo').val();

        if (descricaoTarefa === "") {
            alert('Por favor, insira uma tarefa.');
            return;
        }

        const tarefaExistente = $('.lista-tarefas ul .tarefa').filter(function() {
            return $(this).text() === descricaoTarefa;
        });

        if (tarefaExistente.length > 0) {
            alert('Essa tarefa já está na lista.');
            return;
        }

        if (prazoTarefa && !validarData(prazoTarefa)) {
            alert('O prazo para execução da tarefa não pode ser anterior ao dia atual.');
            return;
        }

        const prazoFormatado = prazoTarefa ? formatarData(prazoTarefa) : '';

        const novaTarefa = `
            <li class="tarefa-item">
                <span class="tarefa">${descricaoTarefa}</span>
                <span class="prazo">${prazoFormatado}</span>
                <button class="btn-executado"><i class="fas fa-check"></i></button>
                <button class="btn-cancelar"><i class="fas fa-trash"></i></button>
            </li>`;

        $('.lista-tarefas ul').append(novaTarefa);

        $('#descricao-tarefa').val('');
        $('#prazo').val('');
    });

    $('.lista-tarefas').on('click', '.btn-executado', function(event) {
        event.stopPropagation(); 
        $(this).closest('li').find('.tarefa, .prazo').toggleClass('tarefa-executada');
    });

    $('.lista-tarefas').on('click', '.btn-cancelar', function(event) {
        event.stopPropagation(); 
        $(this).closest('li').remove();
    });

    function formatarData(data) {
        const partesData = data.split('-');
        const ano = partesData[0];
        const mes = partesData[1];
        const dia = partesData[2];
        return `${dia}-${mes}-${ano}`;
    }

    function validarData(data) {
        const dataAtual = new Date();
        const dataInserida = new Date(data);

        return dataInserida >= dataAtual.setHours(0, 0, 0, 0); 
    }
});
