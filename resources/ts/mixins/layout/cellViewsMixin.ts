import {Component, Prop, Vue} from 'vue-property-decorator'


@Component
export default class cellViewsMixin extends Vue {

    @Prop() manage
    @Prop() item

    public strValue: string = ''

    showValues() {
        let slugs = this.manage.key.split('.'),
            lastKey = slugs.pop(),
            obj = {}, val

        slugs.forEach((i) => {
            obj = Object.keys(obj).length === 0 ? this.item[i] : obj[i]
        })

        if (slugs.length) {
            val = obj && obj.hasOwnProperty(lastKey) ? obj[lastKey] : ''
        } else {
            val = this.item && this.item.hasOwnProperty(lastKey) ? this.item[lastKey] : ''
        }

        this.strValue = val ? val.toString() : ''
    }

    mounted() {
        this.showValues()
    }

}
