<template>
  <div>
    <b-form-group
            label="Nombre de rol"
            label-for="basicName"
            label-cols-lg="3"
            >
      <b-form-input id="basicName" type="text"  v-model="role.name" placeholder="Ingresa nombre de rol"></b-form-input>
    </b-form-group>
   
   <b-form-group
            label="Nombe de rol para mostrar"
            label-for="basicName"
            label-cols-lg="3"
            >
      <b-form-input id="basicName" type="text"  v-model="role.display_name" placeholder="Ingresa nombre de rol para mostrar"></b-form-input>
    </b-form-group>

     <b-form-group label="Permisos">
      <b-form-checkbox
         v-for="option in role.options"
         v-model="role.permissions"
        :key="option.name"
        :value="option.id"
        name=""
      > {{ option.name}}
      </b-form-checkbox>
    </b-form-group>

  </div>
</template>

<script>
  export default {
    props: ['role']
  }
</script>