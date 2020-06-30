<template>

     <div class="card-body">
        <div class="col-lg-12" style="text-align: right;">
            <router-link class=" glyphicon glyphicon-plus btn-lg " to="/moradores" aria-label="Alinhar na esquerda" style="color:blue">
            Anterior</router-link>
        </div>
        <form  @submit.prevent="cadastrar">
        <h2>Moradores</h2>
        <div class="form-group row">
            <label for="nome">Nome</label>
            <input type="text" id="nome"
                class="form-control" required autofocus
                v-model="nome">
        </div>
        <div class="form-group row">
            <label for="rg">RG</label>
            <input type="text"  id="rg"
                class="form-control" required
                v-model="rg">
        </div>
        <div class="form-group row">
            <label for="dataNascimento">Data de nascimento</label>
            <input type="date"  id="dataNascimento"
                class="form-control" required
                v-model="dataNascimento">
        </div>
        <div class="form-group row">
            <label for="numeroApartamento">Numero do Apartamento</label>
            <input type="number"  id="numeroApartamento"
                class="form-control" required
                v-model="numeroApartamento">
        </div>
    
         <button class="btn btn-lg btn-primary btn-block" type="submit">Salvar</button>
    </form>
  
   

</div>

</template>
<script>
import axios from 'axios'
import { mapState } from 'vuex'
export default {
    name: 'morador',
    data() {
    return {
    id:'',
    nome: '',
    rg: '',
    dataNascimento:'',
    numeroApartamento:'',
    moradores:[],
    }

},
computed: {
    ...mapState([
        'usuario'
    ])
},
methods: {
    cadastrar() {

        
        if(this.nome.trim().length <=3){
            alert('O nome deve ser preenchido corretamente!')
        }
        if(this.numeroApartamento.trim() <=10 ||  this.numeroApartamento.trim() >126){
            alert('Apartamento não existe!')
        }
       
        
        else{
            axios.post('moradores/novo',
                {
                 nome: this.nome,
                 rg: this.rg,
                 dataNascimento:this.dataNascimento,
                    numeroApartamento: this.numeroApartamento
                 })

            .then(res => {
                
                console.log(res);
                this.nome = '';
                this.rg = '';
                this.dataNascimento='';
                this.numeroApartamento='';
                alert("Cadastro efetuado  com sucesso!!!");
            
                 })
         .catch(error => console.log(error))
        }
    }

},

}
</script>