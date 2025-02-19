document.getElementById("buscar").addEventListener("click",function(){
    let cep = document.getElementById("cep").value.trim();
    if (cep === "" || cep.length !== 8 || isNaN(cep)){
        alert("Por favor Digite umCEP válido (8 número).");
        return;
    }
    let urlCep ='https://viacep.com.br/ws/${cep}/json';

    // Buscar cidade pelo CEP
    fetch(urlCep)
    .then(Response => {
        if (!Response.ok){
            throw new Error("CEP não encontrado.");
        }
        return Response.jason();
    }
       
    })
    .then(data => {
        if (data.ero) {
            throw newEror("CEP inválido");

        }
        let cidade = data.localidade;
        document.getElementById("cidade").innerText = cidade;
    }

})