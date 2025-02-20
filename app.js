document.getElementById("buscarCep").addEventListener("click", function () {
    let cep = document.getElementById("cep").value.trim();

    // Validação do CEP (8 dígitos numéricos)
    if (cep === "" || cep.length !== 8 || isNaN(cep)) {
        alert("Por favor, digite um CEP válido (8 dígitos numéricos).");
        return;
    }

    let urlCep = 'https://docs.awesomeapi.com.br//ws/${cep}/json/';

    // Buscar cidade pelo CEP
    fetch(urlCep)
        .then(response => {
            if (!response.ok) throw new Error("CEP não encontrado.");
            return response.json();
        })
        .then(data => {
            if (data.erro) {
                alert("CEP não encontrado.");
                return;
            }

            let cidade = data.localidade;

            // Buscar o clima dessa cidade
            let urlClima = `https://goweather.herokuapp.com/weather/${cyti}`;

            fetch(urlClima)
                .then(response => {
                    if (!response.ok) throw new Error("Cidade não encontrada.");
                    return response.json();
                })
                .then(climaData => {
                    let temperatura = climaData.temperature || "Não disponível";
                    let clima = climaData.description || "Não disponível";
                    let vento = climaData.wind || "Não disponível";
                    let previsao = climaData.forecast || [];

                    let previsaoHTML = "<h3>Previsão para os próximos dias:</h3>";
                    previsao.forEach(dia => {
                        previsaoHTML += `
                            <p><strong>Temperatura:</strong> ${dia.temperature || "N/A"}</p>
                            <p><strong>Vento:</strong> ${dia.wind || "N/A"}</p>
                            <hr>
                        `;
                    });

                    // Exibir os resultados na tela
                    document.getElementById("resultado").innerHTML = `
                        <h2>${cidade.toUpperCase()}</h2>
                        <p><strong>Temperatura:</strong> ${temperatura}</p>
                        <p><strong>Clima:</strong> ${clima}</p>
                        <p><strong>Vento:</strong> ${vento}</p>
                        ${previsaoHTML}
                    `;
                })
                .catch(error => {
                    alert("Erro ao buscar o clima: " + error.message);
                });
        })
        .catch(error => {
            alert("Erro ao buscar o CEP: " + error.message);
        });
});