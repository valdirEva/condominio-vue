<template>

    <div class="card-body">
    <div class="col-lg-12" style="text-align: right;">
    <router-link class=" glyphicon glyphicon-plus btn-lg " to="/moradornovo" aria-label="Alinhar na esquerda" style="color:blue">
    Adicionar</router-link>
    </div>
    

    <div>
        <form class="form-inline md-form mr-auto mb-4" @submit.prevent="buscarRg">
        <div class="form-group">
            <label for="rgp"></label>
            <input type="text"  id="rgp"
                class="form-control" required
                v-model="rgp">
        </div>
            
         <button class="btn-info glyphicon glyphicon-search btn-lg" type="submit" v-on:click="navegarRg(rgp)">
         Rg</button>
         </form>
        </div>
        <div>
            <form class="form-inline md-form mr-auto mb-4" @submit.prevent="buscar">
            <div class="form-group">
                <label for="rg"></label>
                 <input type="number"  id="app"
                class="form-control" required
                v-model="app">
            </div>
            
            <button class="btn-info glyphicon glyphicon-search btn-lg" type="submit" v-on:click="navegarAp(app)">
                Ap</button>
            </form>
        </div>
    <br>
     <div>
        <button class="btn-info glyphicon glyphicon-search btn-lg" type="submit" v-on:click="buscarTodos">
         Todos</button>
         
    </div>
    <table id="morador" class="table table-striped" >
        <thead>
        <tr>
            <th >Id</th>
            <th>Nome</th>
            <th>RG</th>
            <th>Data de nascimento</th>
            <th>Apartamento</th>
            <th class="actions">Ações</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="morador in moradores" :key="morador.id">
                <td>{{ morador.id }}</td>
                <td>{{ morador.nome }}</td>
                <td>{{ morador.rg }}</td>
                <td>{{ morador.dataNascimento }}</td>
                <td>{{ morador.numeroApartamento }}</td>
                
                <button  class=" glyphicon glyphicon-trash mr-1" type="submit" style="color:red"  
                v-on:click="excluir(morador.numeroApartamento, morador.id)" > </button>

                <button  type="button" class="glyphicon glyphicon-pencil mr-1"   v-on:click="editar(morador.rg)" style="color:blue">
                    <span class="glyphicon glyphicon" aria-hidden="true"></span> </button>
            </tr>
        </tbody>
    </table>
    

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
    rgp :'',
    app :'',
  
    }
    
    

},
computed: {
    ...mapState([
        'usuario'
    ])
},
methods: {
    
    buscar (numeroApartamento) {
        axios.get('/moradores/'+numeroApartamento,
            { headers: { Accept: 'application/json' } })
        .then(res => {
            console.log(res)
            this.moradores = res.data
        })
        .catch(error => console.log(error))
    },

    buscarTodos () {
        axios.get('/moradores/todos',
            { headers: { Accept: 'application/json' } })
        .then(res => {
            console.log(res)
            this.moradores = res.data
        })
        .catch(error => console.log(error))
    },
    excluir (numeroApartamento,id) {
        var resposta = confirm("Deseja remover esse registro?");
        if (resposta == true) {
            axios.delete('/moradores/delete/'+id)
            .then(response => {
            this.moradores.splice (id,1);
            this.buscar(numeroApartamento);
            this.numeroApartamento='';

            console.log(response)
           
            })
            .catch(error => console.log(error))
        }
    },

     editar(morador){
        this.$router.push('/moradoreditar/'+morador);
       
       
    },

    navegarRg(rgp){
        this.$router.push('/moradorrg/'+rgp);
        console.log(rgp)
    },

     navegarAp(app){
        this.$router.push('/moradorap/'+app);
         console.log(app)
       
    }

   
   

},
    

}
</script>