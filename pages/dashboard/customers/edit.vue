<template>
  <div class="animated fadeIn">
    
    <b-row>
      <b-col md="12">
        <b-card>
          <div slot="header">
            <strong>{{ $t('edit_customer') }}</strong>
          </div>
          <b-form-group
            label="Nombre Cliente"
            label-for="basicName"
            label-cols-lg="3"
            >
            <b-form-input id="basicName" type="text"  placeholder="Ingresa nombre" value="Customer"></b-form-input>
          </b-form-group>
          <b-form-group
            label="Email"
            label-for="basicEmail"
            label-cols-lg="3"
            >
            <b-form-input id="basicEmail" type="email" placeholder="Ingresa email" value="Customer@gmail.com"></b-form-input>
          </b-form-group>
          <b-form-group
            label="Contraseña"
            label-for="basicPassword"
            label-cols-lg="3"
            >
            <b-form-input id="basicPassword" type="password" placeholder="Ingresa contraseña" value="123459009"></b-form-input>
          </b-form-group>

          <b-form-group
            label="Teléfono"
            label-for="basicPhone"
            label-cols-lg="3"
            >
            <b-form-input id="basicPhone" type="text" placeholder="Ingresa número" value="+91-970000000"></b-form-input>
          </b-form-group>
           <b-form-group
            label="Estatus"
            label-for="basicStatus"
            label-cols-lg="3"
            >
            <b-form-radio-group
              id="basicStatus"
              name="Status">
              <div class="custom-control custom-radio custom-control-inline">
                <input type="radio" id="Status" name="Status" class="custom-control-input" value="1" checked>
                <label class="custom-control-label" for="Status">{{ $t('active') }}</label>
              </div>
              <div class="custom-control custom-radio custom-control-inline">
                <input type="radio" id="Status2" name="Status" class="custom-control-input" value="0" >
                <label class="custom-control-label" for="Status2">{{ $t('inactive') }}</label>
              </div>
            </b-form-radio-group>
          </b-form-group>
          <b-form-group
            label="Image"
            label-for="fileInput"
            label-cols-lg="3"
            >
              <b-form-file id="fileInput" :plain="true"></b-form-file>
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
