<template>
  <div class="block">
    <el-timeline>
      <el-timeline-item v-for="(item,index) of timeline" :key="index" :timestamp="item.timestamp" placement="top">
        <el-card>
          <h4>{{ item.title }}</h4>
          <p>{{ item.content }}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timeline: [
        {
          timestamp: '2019/4/20',
          title: 'Update Github template',
          content: 'committed 2022/12/20 20:46'
        },
        {
          timestamp: '2019/4/21',
          title: 'Update Github template',
          content: 'committed 2022/12/29 20:46'
        },
        {
          timestamp: '2019/4/22',
          title: 'Build Template',
          content: 'committed 2023/1/13 20:46'
        },
        {
          timestamp: '2019/4/23',
          title: 'Release New Version',
          content: 'committed 2019/1/24 20:46'
        }
      ]
    }
  }
}
</script>
