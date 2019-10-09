<template>
  <div>
    <b-form-group
            label="Nombre Permiso"
            label-for="basicName"
            label-cols-lg="3"
            >
      <b-form-input id="basicName" type="text"  v-model="permission.name" placeholder="Ingresa nombre"></b-form-input>
    </b-form-group>
  </div>
</template>

<script>
  export default {
    props: ['permission']
  }
</script>