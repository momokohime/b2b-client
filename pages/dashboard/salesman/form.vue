<template>
  <div>
    {{ selection }}
    <b-form-group
            label="Selecciona vendedor"
            label-for="salesmanId"
            label-cols-lg="3"
            >
      <multiselect
        v-model="salesman.relation_id"
        :options="options"
        label="text"
        @select="selection = salesman.relation_id"
        placeholder="Select a salesman">
      </multiselect>
    </b-form-group>

    <b-form-group
            label="Nombre"
            label-for="basicName"
            label-cols-lg="3"
            >
      <b-form-input id="basicName" type="text"  v-model="salesman.name" placeholder="Enter sales man name"></b-form-input>
    </b-form-group>

    <b-form-group
            label="Email"
            label-for="basicEmail"
            label-cols-lg="3"
            >
      <b-form-input id="basicEmail" type="email"  v-model="salesman.email" placeholder="Enter sales man email"></b-form-input>
    </b-form-group>

    <b-form-group
            label="Contraseña"
            label-for="basicPassword"
            label-cols-lg="3"
            >
      <b-form-input id="basicPassword" type="password"  v-model="salesman.password" placeholder="Ingresa contraseña"></b-form-input>
    </b-form-group>

  </div>
</template>

<script>
  export default {
    props: ['salesman', 'options', 'selection']
    // props: ['salesman']
  }
</script>