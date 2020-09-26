<template>
  <div class="home">
    <Banner :list="banner" />
    <Section>
      <div class="home__description" slot="section">
        <div class="home__description__container">
          <p>
            Classroom是基于华为云的云上软件教学服务，支持高校师生实现备课、上课、作业、考试、实验、实训等全教学流程的线上教学，提供多类习题自动判题、企业级DevOps实训、免费在线习题库等众多高级特性辅助进行数字化教学转型。
          </p>
          <x-button type="primary">
            <router-link to="/platform">开始上课</router-link>
          </x-button>
        </div>
      </div>
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
        <x-button type="more" slot="extra">
          <router-link :to="String(cloud.more)">查看更多 ></router-link>
        </x-button>
      </Box>
    </Section>
    <Section notWhite>
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
        <x-button type="more" slot="extra">
          <router-link :to="String(market.more)">查看更多 ></router-link>
        </x-button>
      </Box>
    </Section>
    <Section>
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

.home {
  &__description {
    position: absolute;
    top: -35px;
    z-index: 10;

    width: 100%;

    &__container {
      display: flex;
      align-items: center;
      z-index: 10;

      height: 125px;
      width: 1200px;
      padding: 30px;
      border-radius: 5px;
      margin: auto;

      line-height: 32px;
      background-color: #fff;

      box-shadow: 0 0 20px 0 rgba(41, 48, 64, 0.1);

      a {
        color: #fff;
      }
    }

    & + ::v-deep .content {
      padding-top: 50px;
    }
  }
}
</style>
