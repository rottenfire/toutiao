<template>
  <el-card id="comment">
    <el-row slot="header" type="flex" align="center">
      <bread-crumb>
        <template slot="title">评论列表</template>
      </bread-crumb>
    </el-row>

    <el-table :data="commentList" stripe style="width: 100%">
      <el-table-column prop="title" label="标题" width="400"></el-table-column>
      <el-table-column
        align="center"
        :formatter="formatterStatus"
        prop="comment_status"
        label="评论状态"
      ></el-table-column>
      <el-table-column align="center" prop="total_comment_count" label="总评论数"></el-table-column>
      <el-table-column align="center" prop="fans_comment_count" label="粉丝评论数"></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="obj">
          <el-button type="text">修改</el-button>
          <el-button
            @click="changeCommentStatus(obj.row)"
            :style="{color: obj.row.comment_status? '#F56C6C': '#67C23A'}"
            type="text"
          >{{obj.row.comment_status? '关闭评论': '打开评论'}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row type="flex" justify="center">
      <el-pagination @current-change="changePage" background layout="prev, pager, next" :current-page="page.currentPage" :page-size="page.perPage" :total="page.total"></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      commentList: [],
      page: {
        currentPage: 1,
        perPage: 10,
        total: 0
      }
    }
  },
  methods: {
    getCommentList () {
      const page = {
        page: this.page.currentPage,
        per_page: this.page.perPage
      }
      this.$axios({
        url: '/articles',
        params: {
          response_type: 'comment',
          ...page
        }
      }).then(result => {
        console.log(result)
        this.commentList = result.data.results
        this.page.total = result.data.total_count
      })
    },
    changeCommentStatus (row) {
      console.log(row)
      let msg = row.comment_status ? '关闭' : '打开'
      this.$confirm(`确认是否${msg}评论?`, '提示', {
        type: 'warning'
      }).then(() => {
        this.$axios({
          url: '/comments/status',
          method: 'put',
          params: {
            article_id: row.id.toString()
          },
          data: {
            allow_comment: !row.comment_status
          }
        }).then(result => {
          this.getCommentList()
        })
      })
    },
    changePage (currentPage) {
      console.log(currentPage)
      this.page.currentPage = currentPage
      this.getCommentList()
    },
    formatterStatus (row, column, cellValue, index) {
      return cellValue ? '正常' : '关闭'
    }
  },
  created () {
    this.getCommentList()
  }
}
</script>

<style lang="less" scoped>
.el-row {
  background-color: #fff;
}
.el-pagination {
  margin-top: 20px;
}
</style>
