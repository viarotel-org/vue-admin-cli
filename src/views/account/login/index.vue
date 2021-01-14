<template>
  <div class="min-h-80">
    <div class="text-2xl md:text-3xl text-center">
      登录
    </div>
    <el-form
      ref="formRefs"
      :model="formModel"
      :rules="formRules"
      class="mt-8"
    >
      <el-form-item prop="user">
        <el-input
          v-model="formModel.user"
          placeholder="请输入用户名"
        >
          <template #prefix>
            <via-svg-icon
              name="user"
              class="text-2xl"
            ></via-svg-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="formModel.password"
          placeholder="请输入用户密码"
          type="password"
        >
          <template #prefix>
            <via-svg-icon
              name="password"
              class="text-xl"
            ></via-svg-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <div class="flex items-center justify-between">
          <el-checkbox
            v-model="isSelected"
            size="medium"
          >
            记住密码
          </el-checkbox>
          <!-- <el-button
            type="text"
            class="text-gray  hover:text-black"
          >
            去注册
          </el-button> -->
          <el-button
            type="text"
            class="text-gray-400 hover:text-gray-900 text-sm"
          >
            忘记密码
          </el-button>
        </div>
        <el-button
          type="primary"
          size="medium"
          class="w-full"
          @click="submit"
        >
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      isSelected: false,
      formModel: {
        user: "",
        password: "",
      },
      formRules: {
        user: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    async submit() {
      try {
        const isValid = await this.$refs.formRefs.validate();
        console.log("isValid", isValid);
        if (isValid) {
          this.$store.commit("user/setToken", "token");
          this.$router.replace({ name: "home" });
        }
      } catch (error) {
        // console.log(error);
      }
    },
  },
};
</script>

<style></style>
