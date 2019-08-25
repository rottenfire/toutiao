<template>
  <div v-loading="loading">
    <el-card class="condition-card">
      <bread-crumb slot="header">
        <template slot="title">内容列表</template>
      </bread-crumb>
      <el-form :model="formData" label-width="80px">
        <el-form-item label="文章状态">
          <el-radio-group @change="changeCondition" v-model="formData.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio v-for="(item,index) in articleStatusList" :key="index" :label="index">{{item}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道列表">
          <el-select @change="changeCondition" v-model="formData.channel_id" placeholder="请选择">
            <el-option
              v-for="item in channelList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间选择">
          <el-date-picker
            @change="pickDate"
            v-model="datePick"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="list-card">
      <template slot="header">共找到{{total}}条符合条件的内容</template>
      <div class="content-list">
        <el-row
          class="content-item"
          type="flex"
          justify="space-between"
          v-for="(item,index) in articleList"
          :key="index"
        >
          <div class="leftpart">
            <div class="article-msg">
              <div class="title">{{item.title}}</div>
              <el-tag :type="item.status | articluStatusStyle">{{item.status | articleStatus}}</el-tag>
              <div class="date">{{item.pubdate}}</div>
            </div>
            <img v-for="(img,imgindex) in item.cover.images" :key="imgindex" :src="img" alt />
          </div>
          <div class="rightpart">
            <el-button type="text">
              <i class="el-icon-edit"></i>
              <span>修改</span>
            </el-button>
            <el-button type="text" @click="delArticle(item.id)">
              <i class="el-icon-delete"></i>
              <span>删除</span>
            </el-button>
          </div>
        </el-row>
        <el-row class="pagination" type="flex" justify="center">
          <el-pagination
            :page-size="formData.per_page"
            :current-page="formData.page"
            :total="total"
            @current-change="changePage"
            layout="prev, pager, next"
            background
          ></el-pagination>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdata: null,
        page: 1,
        per_page: 10
      },
      loading: false,
      articleList: [],
      total: 0,
      datePick: null,
      articleStatusList: ['草稿', '待审核', '审核通过', '审核失败'],
      channelList: []
    }
  },
  methods: {
    delArticle (id) {
      this.$confirm('确定要删除吗？', '删除').then(() => {
        this.$axios({
          url: `/articles/${id}`,
          method: 'delete'
        }).then(result => {
          this.$message({ message: '删除成功', type: 'success' })
          this.getArticle()
        })
      })
    },
    changeCondition () {
      this.formData.page = 1
      this.getArticle()
    },
    changePage (page) {
      this.formData.page = page
      this.getArticle()
    },
    // 获取频道列表
    getChannel () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channelList = result.data.channels
      })
    },
    // 选取时间范围
    pickDate (date) {
      if (date.length) {
        this.formData.begin_pubdate = date[0]
        if (date.length >= 2) {
          this.formData.end_pubdate = date[1]
        }
      }
      this.getArticle()
    },
    getArticle () {
      this.loading = true
      this.$axios({
        url: '/articles',
        params: this.formData
      }).then(result => {
        this.articleList = result.data.results
        this.total = result.data.total_count
        this.loading = false
      })
    }
  },
  filters: {
    articleStatus (value) {
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '审核通过'
        case 3:
          return '审核失败'
        case 4:
          return '已删除'
        default:
          return '未知'
      }
    },
    articluStatusStyle (value) {
      switch (value) {
        case 0:
          return 'warning'
        case 1:
          return 'info'
        case 2:
          return 'success'
        case 3:
          return 'danger'
        case 4:
          return 'danger'
        default:
          return ''
      }
    }
  },
  created () {
    this.getChannel()
    this.getArticle()
  }
}
</script>

<style lang="less" scoped>
.condition-card {
  margin-bottom: 10px;
}
.list-card {
  .content-list {
    padding: 0 5px;
    .content-item {
      min-height: 120px;
      padding: 10px 0;
      border-bottom: 1px solid #ccc;
      .leftpart {
        display: flex;
        justify-content: flex-start;
        img {
          width: 160px;
          height: 120px;
          margin-left: 20px;
        }
        .article-msg {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: flex-start;
          .title {
            width: 200px;
            font-size: 14px;
            text-overflow: ellipsis;
            color: #333;
          }
          .date {
            font-size: 12px;
            color: #999;
          }
        }
      }
    }
  }
  .pagination {
    margin-top: 20px;
  }
}
</style>
