<template>
  <div class="home">
    <Banner :list="banner" />
    <Section>
      <Box
        class="box-cloud"
        :title="cloud.title"
        :description="cloud.description"
      >
        <Card
          v-for="(item, index) in cloud.list"
          :key="item.href"
          v-bind="item"
          :currentIndex="index"
        />
        <template #extra>
          <x-button type="more">
            <router-link :to="String(cloud.more)">查看更多 ></router-link>
          </x-button>
        </template>
      </Box>
      <Box
        class="box-market"
        :title="market.title"
        :description="market.description"
      >
        <Card
          v-for="(item, index) in market.list"
          :key="item.href"
          v-bind="item"
          :currentIndex="6 + index"
        />
        <template #extra>
          <x-button type="more">
            <router-link :to="String(market.more)">查看更多 ></router-link>
          </x-button>
        </template>
      </Box>
      <Box :title="notice.title">
        <Buleetin :list="notice.list" />
      </Box>
    </Section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Banner from '@/components/Banner.vue';
import Section from '@/layout/Section.vue';
import Box from '@/components/Box.vue';
import Card from '@/components/Card.vue';
import Buleetin from '@/components/Bulletin.vue';
import XButton from '@/components/common/Button.vue';

@Component({
  components: {
    Banner,
    Section,
    Box,
    Card,
    Buleetin,
    XButton,
  },
})
export default class Home extends Vue {
  banner = [];
  cloud = {};
  market = {};
  notice = {};

  created() {
    this.$api
      .get<{ banner: []; classCloud: object; market: object; notice: object }>(
        '/api/home'
      )
      .then(({ banner, classCloud, market, notice }) => {
        this.banner = banner;
        this.cloud = classCloud;
        this.market = market;
        this.notice = notice;
      });
  }
}
</script>

<style lang="scss" scoped>
.box-cloud,
.box-market {
  ::v-deep .box__content {
    display: grid;
    grid-template-columns: repeat(3, 380px);
    grid-gap: 30px;
  }

  ::v-deep .card__cover {
    background: $cover__card;
  }
}
</style>
