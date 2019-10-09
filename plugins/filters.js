import Vue from 'vue'
import helper from '~/utils/helper'

Vue.filter('price', amount => helper.formatCurreny(amount))

Vue.filter('price_raw', amount => helper.formatCurrenyRaw(amount))

Vue.filter('lowercase', string => string.toLowerCase().trim())