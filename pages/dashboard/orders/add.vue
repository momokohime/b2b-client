<template>
  <div class="animated fadeIn">
    
    <b-row>
      <b-col md="12">
        <b-card>
          <div slot="header">
            <strong>{{ $t('add_products') }}</strong>
          </div>
          <b-form-group
            label="Nombre producto"
            label-for="basicName"
            label-cols-lg="3"
            >
            <b-form-input id="basicName" type="text"  placeholder="Ingresa nombre"></b-form-input>
          </b-form-group>
          
          <b-form-group
            label="Descripción"
            label-for="basicDescription"
            label-cols-lg="3">  
           <b-form-textarea
              id="basicDescription"
              placeholder="Description"
              rows="8"
            ></b-form-textarea>

          </b-form-group>



          <b-form-group
            label="Precio producto"
            label-for="basicPrice"
            label-cols-lg="3"
            >
            <b-input-group>
                  <b-input-group-prepend>
                    <b-input-group-text>$</b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input id="basicPrice" type="text"  placeholder="Precio producto"></b-form-input>
                  <b-input-group-append><b-input-group-text>.00</b-input-group-text></b-input-group-append>
          </b-input-group>

          </b-form-group>
        

           <b-form-group
            label="Imágenes producto"
            label-for="productImages"
            label-cols-lg="3">
              <b-form-file id="productImages" :plain="true" :multiple="true"></b-form-file>
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
