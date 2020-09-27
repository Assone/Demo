<template>
  <swiper :options="options">
    <swiper-slide v-for="{ image, href } in list" :key="href">
      <a :href="href">
        <img :src="image" alt="banner" />
      </a>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import SwiperCore, { Pagination, Autoplay, Lazy, SwiperOptions } from 'swiper';
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';

import 'swiper/swiper.scss';
import 'swiper/components/pagination/pagination.scss';

SwiperCore.use([Pagination, Autoplay, Lazy]);

@Component({
  components: {
    Swiper,
    SwiperSlide,
  },
})
export default class Banner extends Vue {
  @Prop({ type: Array }) list!: Array<object>;

  options: SwiperOptions = {
    loop: true,
    lazy: true,
    autoplay: {
      delay: 3000,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  };
}
</script>

<style lang="scss" scoped>
::v-deep .swiper-pagination {
  bottom: 40px;
}

::v-deep .swiper-pagination-bullet-active {
  width: 28px;
  border-radius: 8px;
  background-color: $color__active;
}
</style>
