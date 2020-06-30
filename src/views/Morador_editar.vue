<template>

     <div class="card-body">
        <div class="col-lg-12" style="text-align: right;">
            <router-link class=" glyphicon glyphicon-plus btn-lg " to="/moradores" aria-label="Alinhar na esquerda" style="color:blue">
            Anterior</router-link>
        </div>
        <form  @submit.prevent="editar">
        <h2>Moradores</h2>
        <div class="form-group row">
            <label for="id">id</label>
            <input type="number" id="id"
                class="form-control" required autofocus
                v-model="morador.id"  readonly>
        </div>



        <div class="form-group row">
            <label for="nome">Nome</label>
            <input type="text" id="nome"
                class="form-control" required autofocus
                v-model="morador.nome" >
        </div>
        <div class="form-group row">
            <label for="rg">RG</label>
            <input type="text"  id="rg"
                class="form-control" required
                v-model="morador.rg">
        </div>
        <div class="form-group row">
            <label for="dataNascimento">Data de nascimento</label>
            <input type="date"  id="dataNascimento"
                class="form-control" required
                v-model="morador.dataNascimento">
        </div>
        <div class="form-group row">
            <label for="numeroApartamento">Numero do Apartamento</label>
            <input type="number"  id="numeroApartamento"
                class="form-control" required
                v-model="morador.numeroApartamento">
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
    props: {
        morador: {
            type:null,
            default: { id: '33'}

        }
    },

    data() {
    return {
    id:'',
    nome: '',
    rg: '',
    dataNascimento:'',
    numeroApartamento:'',
   
    }

},
computed: {
    ...mapState([
        'usuario'
    ])
},
methods: {
    editar() {
        if(this.morador.nome.trim().length <=3){
            alert('O nome deve ser preenchido corretamente!')
        }
        if(this.morador.numeroApartamento.trim() <=10 ||  this.morador.numeroApartamento.trim() >126){
            alert('Apartamento não existe!')
        }
        else{
            axios.put('moradores/atualizar/'+this.morador.id,
            {
                id:this.morador.id,
                nome: this.morador.nome,
                rg: this.morador.rg,
                dataNascimento:this.morador.dataNascimento,
                numeroApartamento: this.morador.numeroApartamento
            })
            .then(res => {
                console.log(res);
                this.morador.id='';
                this.morador.nome = '';
                this.morador.rg = '';
                this.morador.dataNascimento='';
                this.morador.numeroApartamento='';
                alert("Morador alterado com sucesso!!!");
            
        })
         .catch(error => console.log(error))
        }
        
    },
    buscarRg(rg) {
        axios.get('/moradores/buscarg/'+rg,
            { headers: { Accept: 'application/json' } })
        .then(res => {
            console.log(res)
            
            this.morador= res.data
        })
        .catch(error => console.log(error))
    }

},

created () {
          this.buscarRg(this.morador);
         
       }
       

}
</script>