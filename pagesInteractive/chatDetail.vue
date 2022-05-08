<template>
  <view style="background-color: #f3f3f3" @click="cancle">
    <navbar :title="pageTitle"></navbar>
    <scroll-view
      scroll-y="true"
      :scroll-top="scrollTop"
      class="Anchor"
      :upper-threshold="pageHeight * 2"
      @scrolltoupper="scrolltoupper"
      :style="{ height: `calc(100vh - ${ViewPart - 20}px)` }"
      :scroll-with-animation="!ifLoaddingShow"
      :scroll-anchoring="true"
    >
      <view style="padding-bottom: 180rpx" class="Anchor">
        <view class="padding">
          <!-- 顶部出现卡片 -->
          <view
            class="padding wmax flex"
            v-if="isCompleted"
            style="height: 340rpx"
          >
            <view
              class="
                flex-sub
                profileCard
                flex flex-direction
                justify-between
                padding
              "
              :class="lbgColor"
              v-if="userInfo"
              @click="enterUserHome(userIdTo)"
            >
              <view class="">
                <u-avatar
                  :size="80"
                  :src="userInfo.avatar || userInfo.avatarUrl"
                ></u-avatar>
              </view>
              <view class="text-white">
                {{ userInfo.nick || userInfo.nickName }}
              </view>
              <view class="text-white"> 打个招呼吧~ </view>
            </view>
          </view>
        </view>
        <view style="background-color: #f5f5f5"></view>
        <view v-for="(item, I_index) in msgList" :key="item.ID">
          <view
            class="isMessage"
            v-if="!item.isRevoked && !item.isDeleted"
            :class="item.from !== userId ? 'isNotSelf' : 'isSelf'"
          >
            <view
              :class="
                item.from !== userId ? 'margin-right-sm' : 'margin-left-sm'
              "
            >
              <u-avatar
                :size="80"
                :src="item.avatar"
                @click="enterUserHome(item.from)"
              ></u-avatar>
            </view>
            <view
              class="messageBlock flex align-center justify-center"
              :data-backIndex="item.random"
              @touchstart="backTargetChangeStart"
              @touchend="backTargetChangeEnd"
              :style="{
                backgroundColor: chatStyle[item.from !== userId ? 0 : 1],
              }"
            >
              <!-- 文字模式 -->
              <view
                class="flex align-end"
                v-if="item.payload.text"
                style="flex-wrap: wrap"
              >
                <view
                  class=""
                  v-for="(msg, m_index) in item.payload.textDom"
                  :key="m_index"
                  :data-backIndex="item.random"
                >
                  <text v-if="msg.name === 'text'">{{ msg.text }}</text>
                  <image
                    :src="msg.src"
                    mode="aspectFill"
                    v-if="msg.name === 'image'"
                    style="
                      width: 40rpx;
                      height: 40rpx;
                      vertical-align: text-bottom;
                    "
                  >
                  </image>
                </view>
              </view>
              <!-- <text class="text-justify" v-if="item.payload.text">{{item.payload.text}}</text> -->

              <!-- 图片模式 -->
              <view
                class="flex align-center justify-center"
                v-if="item.payload.imageInfoArray"
              >
                <image
                  :src="item.payload.imageInfoArray[2].url"
                  @click="imgPrview(item.payload.imageInfoArray[1].url)"
                  mode="aspectFill"
                  v-if="item.payload.imageInfoArray[2]"
                  :style="{
                    width: item.payload.imageInfoArray[1].width + 'px',
                    height: item.payload.imageInfoArray[1].height + 'px',
                    maxWidth: '400rpx',
                  }"
                  :data-backIndex="item.random"
                >
                </image>
              </view>
              <!-- 语音模式 -->
              <view
                class="flex align-center"
                v-if="item.payload.remoteAudioUrl"
                :data-backIndex="item.random"
                @click="audioPlayHandle(item.payload.url, I_index, $event)"
              >
                <view
                  class="blockDance flex align-center"
                  :style="{ height: '40rpx' }"
                >
                  <view
                    :class="{ animateRuning: I_index === playAudioIndex }"
                    v-for="(item, index) in 4"
                    :data-backIndex="item.random"
                    :key="index"
                    class="blockDance-item"
                  ></view>
                </view>
                <text class="margin-left-xs" :data-backIndex="item.random">{{
                  (item.payload.second || 0.5) + 's'
                }}</text>
              </view>
              <!-- 消息撤回框 -->
              <view
                class="chatNewsBack padding-xs"
                @click="newsBackClickHandle(item)"
                v-if="item.from === userId && newsBackIndex === item.random"
              >
                撤回消息
              </view>
            </view>
          </view>
          <view
            class="flex justify-center align-center"
            v-if="item.isRevoked && !item.isDeleted"
          >
            <u-tag
              :text="`${userId === item.from ? '你' : '对方'}撤回了一条消息`"
              shape="circle"
              color="#909399"
              bg-color="#F5F5F5"
              border-color="#F5F5F5"
              @click="deleteRevokedMsg(item)"
            />
          </view>
        </view>
        <!-- 上顶框 -->
        <view class="" :style="{ height: paddingHeight + 'px' }"></view>
      </view>
    </scroll-view>
    <!-- 表情框 -->
    <scroll-view
      scroll-y="true"
      class="emojiBox bg-white wmax"
      style="height: 300px; width: 100%"
      v-if="paddingHeight && !inputState"
    >
      <view class="flex" style="flex-wrap: wrap">
        <view
          class="emojiItem"
          v-for="(emoji, e_index) in emojiName"
          :key="e_index"
          @click="emojiSelect(emoji)"
        >
          <view class="emojiTtemImg flex align-center justify-center">
            <image
              :src="getEmoji(emoji)"
              mode="aspectFill"
              style="width: 60%; height: 60%"
            ></image>
          </view>
        </view>
      </view>
    </scroll-view>
    <textInput
      :mode="'aboutChat'"
      :userIdTo="userIdTo"
      :keyBoardFlag="keyBoardFlag"
      :buttonColor="chatStyle[0]"
    ></textInput>
    <loading v-if="ifLoaddingShow"></loading>
  </view>
</template>

<script>
import { emojiUrl, emojiMap, emojiName, _TextMsgParser } from 'utils/emoji.js';
// 播放
const innerAudioContext = uni.createInnerAudioContext();
export default {
  data() {
    return {
      emojiName: emojiName,
      ifLoaddingShow: true,
      ViewPart: this.ViewPart,
      pageHeight: this.windowHeight,
      // 内容
      content: '',
      // 发送图片
      image: '',
      // 请求的会话ID
      requestId: '',
      tim: this.tim,
      // 消息列表
      msgList: [],
      pageTitle: '加载中',
      // 是否请求完全
      isCompleted: false,
      // 下一次请求的数据ID
      nextReqMessageID: '',
      // 顶部高度
      scrollTop: 0,
      // 发送对象
      userIdTo: '',
      // scrollTimmer 防抖
      scrollTimmer: null,
      userInfo: null,
      paddingHeight: 0,
      keyBoardFlag: false,
      recorderManager: null,
      playAudioIndex: -1,
      newsBackIndex: -1,
      newsBackStartTime: undefined,
      newsBackTimmer: null,
      inputState: false,
    };
  },
  methods: {
    getMessageList() {
      if (this.isCompleted || this.scrollTimmer) {
        return;
      }
      // 获取信息过程
      let tim = this.tim;
      let promise = tim.getMessageList({
        conversationID: this.requestId,
        count: 15,
        nextReqMessageID: this.nextReqMessageID,
      });
      promise
        .then((imResponse) => {
          if (
            !!this.nextReqMessageID &&
            this.nextReqMessageID === imResponse.data.nextReqMessageID
          )
            return;
          // 渲染数据
          for (let msg of imResponse.data.messageList) {
            if (msg.payload.text) {
              this.$set(
                msg.payload,
                'textDom',
                this.TextMsgParser(msg.payload.text)
              );
            }
          }
          //
          this.msgList = imResponse.data.messageList.concat(this.msgList); // 消息列表。
          this.nextReqMessageID = imResponse.data.nextReqMessageID; // 用于续拉，分页续拉时需传入该字段。
          this.isCompleted = imResponse.data.isCompleted; // 表示是否已经拉完所有消息。
          if (!this.scrollTop) {
            this.scrollTop = this.msgList.length * 999;
          }
          setTimeout(() => {
            this.ifLoaddingShow = false;
          }, 500);
          this.scrollTimmer = setTimeout(() => {
            this.scrollTimmer = null;
          }, 200);
        })
        .catch((err) => {
          console.log(err);
        });
      this.$forceUpdate();
    },
    scrolltoupper() {
      if (this.scrollTimmer) {
        return;
      }
      this.getMessageList();
    },
    getImgShowStyle(img) {
      return ';' + this.$api.imgHandle.multiImgShow([img]);
    },
    imgPrview(url) {
      if (this.newsBackIndex !== -1) return;
      this.$api.imgHandle.imgPreview(url, [url]);
    },
    enterUserHome(id) {
      this.$api.routerHandle.goto(`/pagesHome/mynews?id=${id}`);
    },
    audioPlayHandle(src, I_index, e) {
      innerAudioContext.stop();
      this.playAudioIndex = I_index;
      this.$forceUpdate();
      innerAudioContext.src = src;
      innerAudioContext.play();
    },
    // 撤回消息更改对象
    backTargetChangeStart(e) {
      this.newsBackStartTime = +new Date();
      this.newsBackTimmer = setTimeout(() => {
        this.newsBackIndex = e.target.dataset.backindex;
        this.$forceUpdate();
      }, 800);
    },
    backTargetChangeEnd(e) {
      if (+new Date() - this.newsBackStartTime < 800) {
        this.newsBackStartTime = undefined;
        this.newsBackIndex = -1;
        clearTimeout(this.newsBackTimmer);
        this.newsBackTimmer = null;
        this.$forceUpdate();
      }
    },
    cancle() {
      if (this.newsBackIndex === -1 || !this.newsBackStartTime) return;
      if (+new Date() - this.newsBackStartTime > 2000) {
        this.newsBackStartTime = undefined;
        this.newsBackIndex = -1;
        clearTimeout(this.newsBackTimmer);
        this.newsBackTimmer = null;
        this.$forceUpdate();
      }
    },
    newsBackClickHandle(message) {
      // 主动撤回消息
      let tim = this.tim;
      let promise = tim.revokeMessage(message);
      promise
        .then((imResponse) => {
          // 消息撤回成功
          this.$set(message, 'isRevoked', true);
          console.log('撤回成功');
        })
        .catch(function (imError) {
          if (imError.code == 20016) {
            return uni.showToast({
              title: '已超过2分钟无法撤回~',
              icon: 'none',
            });
          }
        });
    },
    // 删除撤回提示
    deleteRevokedMsg(message) {
      let tim = this.tim;
      let promise = tim.deleteMessage([message]);
      promise
        .then((imResponse) => {
          // 删除消息成功
          this.$set(message, 'isDeleted', true);
        })
        .catch(function (imError) {
          // 删除消息失败
          console.warn('deleteMessage error:', imError);
        });
    },
    emojicontentRender(content) {
      return content.replace(/\[([\S\s]+?)\]/g, (name) => {
        if (emojiMap[name]) {
          return `<img src="${
            emojiUrl + emojiMap[name]
          }" class="emojiStyle"></img>`;
        } else {
          return name;
        }
      });
    },
    getEmoji(name) {
      return emojiUrl + emojiMap[name];
    },
    emojiSelect(name) {
      uni.$emit('textInputAddEmoji', name);
    },
    TextMsgParser(msg) {
      return _TextMsgParser(msg);
    },
  },
  computed: {
    userId() {
      return this.$cache.get('userId');
    },
    chatStyle() {
      let colorPair = [
        '#F8D90A, #FFF',
        '#0396FF, #FFF',
        '#EA5455, #FFF',
        '#7360F0, #FFF',
        '#32CCBC, #FFF',
      ];
      let base = this.pageTitle.charCodeAt(0) % 10 >> 1;
      return colorPair[base].split(',');
    },
    lbgColor() {
      return 'lbg-' + ((this.pageTitle.charCodeAt(0) % 10 >> 1) + 1);
    },
  },
  onLoad(options) {
    // 将某会话下所有未读消息已读上报
    let tim = this.tim;
    this.tim.setMessageRead({ conversationID: options.id });
    this.pageTitle = options.nick;
    this.requestId = options.id;
    // 第一次获取消息列表
    this.getMessageList();
    this.userIdTo = options.userIdTo;
    //
    const eventChannel = this.getOpenerEventChannel();
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('acceptDataFromOpenerPage', (data) => {
      this.userInfo = data.data;
    });
    //
    // 收到消息
    uni.$off('reciveChatMsg');
    uni.$off('keyboardChange');
    uni.$on('keyboardChange', (height, inputState) => {
      this.inputState = inputState;
      this.paddingHeight = height;
      this.$nextTick(() => {
        this.scrollTop += height;
        this.$forceUpdate();
      });
    });
    uni.$on('reciveChatMsg', (data) => {
      data = data.filter((item) => {
        if (item.payload.text) {
          this.$set(
            item.payload,
            'textDom',
            this.TextMsgParser(item.payload.text)
          );
        }
        return item.from === this.userIdTo || item.to === this.userIdTo;
      });
      this.msgList = this.msgList.concat(data);
      this.scrollTop = this.msgList.length * 999;
      this.tim.setMessageRead({ conversationID: options.id });
      this.$forceUpdate();
    });
    // 音频结束
    innerAudioContext.onStop(() => {
      this.playAudioIndex = -1;
      this.$forceUpdate();
    });

    innerAudioContext.onEnded(() => {
      this.playAudioIndex = -1;
      this.$forceUpdate();
    });
  },
  onUnload() {
    uni.$off('reciveChatMsg');
    innerAudioContext.stop();
  },
};
</script>

<style lang="scss" scoped>
.Anchor {
  overflow-anchor: auto;
}

.profileCard {
  border-radius: 10rpx;
  box-shadow: 10rpx 10rpx 10rpx rgba($color: #333333, $alpha: 0.1);
}

.isMessage {
  // 消息
  padding: 30rpx 20rpx;
  display: flex;
  display: flex;
  justify-content: flex-start;
}

.messageBlock {
  max-width: 450rpx;
  padding: 20rpx;
  // letter-spacing: 0.5rpx;
  min-width: 100rpx;
  border-radius: 10rpx;
}

.isNotSelf {
  .messageBlock {
    background-color: #0081ff;
    color: #fff;
    box-shadow: 10rpx 10rpx 10rpx rgba($color: #333333, $alpha: 0.1);
  }
}
.isSelf {
  flex-direction: row-reverse;
  justify-self: flex-start;
  position: relative;
  .chatNewsBack {
    position: absolute;
    top: 0;
    right: 0;
    background-color: rgba($color: #000000, $alpha: 0.5);
    color: white;
    transform: translateX(-50%) translateY(-100%);
    border-radius: 10rpx;
  }
  .messageBlock {
    background-color: #d9e4fa;
    color: #000;
  }
}

.blockDance {
  .blockDance-item {
    width: 8rpx;
    margin-right: 5rpx;
    border-radius: 4rpx;
    animation-duration: 0.3s;
    background-color: #000;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    animation-play-state: paused;
    &:nth-child(1) {
      height: 20rpx;
      animation-name: dance1;
    }
    &:nth-child(2) {
      height: 40rpx;
      animation-name: dance2;
    }
    &:nth-child(3) {
      height: 30rpx;
      animation-name: dance3;
    }
    &:nth-child(4) {
      height: 20rpx;
      animation-name: dance4;
    }
  }
}

.emojiItem {
  position: relative;
  width: 12.5%;
  height: 0;
  padding-top: 12.5%;
  .emojiTtemImg {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }
}

.emojiStyle {
  width: 50rpx;
  height: 50rpx;
  vertical-align: text-bottom;
}

.emojiBox {
  position: fixed;
  bottom: 0;
}

@keyframes dance1 {
  from {
    height: 20rpx;
  }
  to {
    height: 40rpx;
  }
}

@keyframes dance2 {
  from {
    height: 40rpx;
  }
  to {
    height: 20rpx;
  }
}

@keyframes dance3 {
  from {
    height: 30rpx;
  }

  50% {
    height: 40rpx;
  }

  to {
    height: 30rpx;
  }
}

@keyframes dance4 {
  from {
    height: 20rpx;
  }
  to {
    height: 40rpx;
  }
}

.animateRuning {
  animation-play-state: running !important;
}
</style>
