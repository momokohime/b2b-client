<template>
  <div class="animated fadeIn">
    
    <b-row>
      <b-col md="12">
        <b-card>
          <div slot="header">
            <strong>{{ $t('add_attribute') }}</strong>
          </div>
          <b-form-group
            label="Nombre"
            label-for="basicName"
            label-cols-lg="3"
            >
            <b-form-input id="basicName" type="text"  placeholder="Ingresa nombre"></b-form-input>
          </b-form-group>
        
           <b-form-group
            label="Status"
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
