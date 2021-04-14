<template>
  <div>
    <van-form>
      <van-field
          v-model="phone"
          name="手机号码"
          label="手机号码"
          placeholder="手机号码"
          :rules="[{ required: true, message: '请填写手机号码' }]"
      />
      <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
          @touchstart.native.stop="show = true"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" style="background-color: #D4473C;border: none">提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  name: "register",
  data() {
    return {
      phone: "",
      password: ""
    }
  },

}
</script>

<style scoped>

</style>