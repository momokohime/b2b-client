<template>
  <div>
    <b-form-group
            label="DESDE"
            label-for="basicDESDE"
            label-cols-lg="3"
            >
      <b-form-input id="basicDESDE" type="text"  v-model="application.DESDE" placeholder="INGRESA DESDE"></b-form-input>
    </b-form-group>

    <b-form-group
            label="HASTA"
            label-for="basicHASTA"
            label-cols-lg="3"
            >
      <b-form-input id="basicHASTA" type="text"  v-model="application.HASTA" placeholder="INGRESA HASTA"></b-form-input>
    </b-form-group>

    <b-form-group
            label="MARCA"
            label-for="basicMARCA"
            label-cols-lg="3"
            >
      <b-form-input id="basicMARCA" type="text"  v-model="application.MARCA" placeholder="INGRESA MARCA"></b-form-input>
    </b-form-group>

    <b-form-group
            label="MODELO"
            label-for="basicMODELO"
            label-cols-lg="3"
            >
      <b-form-input id="basicMODELO" type="text"  v-model="application.MODELO" placeholder="INGRESA MODELO"></b-form-input>
    </b-form-group>

    <b-form-group
            label="MOTOR"
            label-for="basicMOTOR"
            label-cols-lg="3"
            >
      <b-form-input id="basicMOTOR" type="text"  v-model="application.MOTOR" placeholder="INGRESA MOTOR"></b-form-input>
    </b-form-group>

  </div>
</template>

<script>
  export default {
    props: ['application']
  }
</script>