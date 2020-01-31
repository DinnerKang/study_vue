<<template>
  <div class="home">
    <header-menu></header-menu>
    <router-view/>
  </div>
</template>

<script>
import headerMenu from '../components/Header';

export default {
  name: 'Main',
  components: {
    headerMenu,
  },
}
</script>