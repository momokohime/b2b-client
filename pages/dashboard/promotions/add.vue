<template>
  <div class="animated fadeIn">
    
    <b-row>
      <b-col md="12">
        <b-card>
          <div slot="header">
            <strong>{{ $t('add_promotions') }}</strong>
          </div>
          <b-form-group
            label="Nombre de promoción"
            label-for="basicName"
            label-cols-lg="3"
            >
            <b-form-input id="basicName" type="text"  placeholder="Ingresa nombre de promoción"></b-form-input>
          </b-form-group>
          <b-form-group
            label="Porcentaje"
            label-for="basicPercentage"
            label-cols-lg="3"
            >
            <b-form-input id="basicPercentage" type="text"  placeholder="Porcentaje"></b-form-input>
          </b-form-group>
          <b-form-group
            label="Selecciona"
            label-for="basicMultiSelect"
            label-cols-lg="3">
            <b-form-select id="basicMultiSelect"
              :plain="true"
              :multiple="true"
              :options="[
                {
                  text: 'All Products',
                  value: null
                },
                {
                  text: 'Product 1',
                  value: 'a'
                }, {
                  text: 'Product 2',
                  value: 'b'
                }, {
                  text: 'Product 3',
                  value: 'c'
                }, {
                  text: 'Product 4',
                  value: 'd'
                }]"
              :value="[null,'c']">
            </b-form-select>
          </b-form-group>
          <b-form-group
            label="Fecha inicio"
            label-for="basicStartDate"
            label-cols-lg="3"
            >
            <b-form-input id="basicStartDate" type="date" ></b-form-input>
          </b-form-group>

          <b-form-group
            label="Fecha fin"
            label-for="basicEndDate"
            label-cols-lg="3"
            >
            <b-form-input id="basicEndDate" type="date"  ></b-form-input>
          </b-form-group>
          
          <div slot="footer">
             <div class="form-actions">
                <b-button type="submit" variant="primary">{{ $t('save_changes') }}</b-button>
                <b-button type="button" variant="secondary">{{ $t('cancel') }}</b-button>
              </div>
          </div>
        </b-card>
       
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: 'forms',
  layout: 'dashboard',
  data () {
    return {
      selected: [] // Must be an array reference!
    }
  },
  methods: {
    click () {
      // do nothing
    }
  }
}
</script>
