<template>
  <div>
         <b-form-group
            label="Franchise"
            label-for="basicName"
            label-cols-lg="3"
            >
          <b-form-select v-model="coupon.franchise" :options="coupon.options" class="mt-3"></b-form-select>
          </b-form-group> 
          <b-form-group
            label="Producto"
            label-for="basicName"
            label-cols-lg="3"
            >
          <multiselect
            v-model="coupon.val"
            :options="coupon.opt"
            :close-on-select="false"
            :clear-on-select="false"
            :hide-selected="true"
            :preserve-search="true"
            placeholder="Pick some"
            label="name1"
            track-by="name1"
            :preselect-first="true"
            id="example"
            @select="onSelect"
            ></multiselect>
          </b-form-group> 
         <b-form-group
            label="Nombre Cupón"
            label-for="basicName"
            label-cols-lg="3"
            >
            <b-form-input id="basicName" type="text"  v-model="coupon.name" placeholder="Ingresa nombre de cupón"></b-form-input>
          </b-form-group>
          <b-form-group
            label="Código Cupón"
            label-for="basicName"
            label-cols-lg="3"
            >
            <b-form-input id="basicName" type="text"  v-model="coupon.code" placeholder="Código cupón"></b-form-input>
          </b-form-group>
          <b-form-group
            label="Valor"
            label-for="basicName"
            label-cols-lg="3"
            >
            <b-form-input id="basicName" type="text"  v-model="coupon.value" placeholder="Ingresa valor"></b-form-input>
          </b-form-group>

          <b-form-group
            label="Fecha de inicio"
            label-for="basicStartDate"
            label-cols-lg="3"
            >
            <b-form-input id="basicStartDate" v-model="coupon.start_date" type="date" ></b-form-input>
          </b-form-group>

          <b-form-group
            label="Fecha de fin""
            label-for="basicEndDate"
            label-cols-lg="3"
            >
            <b-form-input id="basicEndDate" v-model="coupon.end_date" type="date"  ></b-form-input>
          </b-form-group>
          <b-form-group
            label="Activo"
            label-for="basicName"
            label-cols-lg="3"
            >
          <b-form-select v-model="coupon.status" :options="coupon.sOptions" class="mt-3"></b-form-select>
           </b-form-group>
          <b-form-group
            label="Descripción"
            label-for="basicName"
            label-cols-lg="3"
            >
          <b-form-textarea id="basicName"  v-model="coupon.description" placeholder="Ingresa descripción"></b-form-textarea>
          </b-form-group>
  </div>
</template>

<script>
    export default {
    props: ['coupon']
  }
</script>