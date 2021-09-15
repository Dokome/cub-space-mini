export const emojiUrl = 'https://image.sapce.club/emoji';
export const emojiMap = {
	'[doge•圣诞]':'/bxhl/doge-sd.png',
	'[妙啊•圣诞]':'/bxhl/ma-sd.png',
	'[呲牙•圣诞]':'/bxhl/zy-sd.png',
	'[OK•圣诞]':'/bxhl/OK-sd.png',
	'[星星眼•圣诞]':'/bxhl/xxy-sd.png',
	'[吃瓜•圣诞]':'/bxhl/cg-sd.png',
	'[滑稽•圣诞]':'/bxhl/hj-sd.png',
	'[辣眼睛•圣诞]':'/bxhl/lyj-sd.png',
	'[打call•圣诞]':'/bxhl/dcall-sd.png',
	'[捂脸•圣诞]':'/bxhl/wl-sd.png',
	'[哦呼]':'/bxhl/oh.png',
	'[歪嘴]':'/bxhl/wz.png',
	'[嫌弃]':'/bxhl/xq.png',
	'[喜欢]':'/bxhl/xh.png',
	'[酸了]':'/bxhl/sl.png',
	'[大哭]':'/bxhl/dk.png',
	'[害羞]':'/bxhl/hx.png',
	'[疑惑]':'/bxhl/yh.png',
	'[调皮]':'/bxhl/tp.png',
	'[喜极而泣]':'/bxhl/xjeq.png',
	'[奸笑]':'/bxhl/jx.png',
	'[笑]':'/bxhl/x.png',
	'[偷笑]':'/bxhl/tx.png',
	'[大笑]':'/bxhl/dx.png',
	'[阴险]':'/bxhl/yx.png',
	'[捂脸]':'/bxhl/wl.png',
	'[囧]':'/bxhl/t.png',
	'[呆]':'/bxhl/d.png',
	'[抠鼻]':'/bxhl/kp.png',
	'[惊喜]':'/bxhl/jx1.png',
	'[惊讶]':'/bxhl/jy.png',
	'[滑稽]':'/bxhl/hj.png',
	'[点赞]':'/bxhl/dz.png',
	'[鼓掌]':'/bxhl/gz.png',
	'[无语]':'/bxhl/wy.png',
	'[尴尬]':'/bxhl/gg.png',
	'[冷]':'/bxhl/l.png',
	'[灵魂出窍]':'/bxhl/lhcq.png',
	'[委屈]':'/bxhl/wq.png',
	'[骄傲]':'/bxhl/ja.png',
	'[疼]':'/bxhl/t1.png',
	'[吓]':'/bxhl/x1.png',
	'[生病]':'/bxhl/sb.png',
	'[吐]':'/bxhl/t2.png',
	'[嘘声]':'/bxhl/xs.png',
	'[捂眼]':'/bxhl/wy1.png',
	'[思考]':'/bxhl/sk.png',
	'[再见]':'/bxhl/zj.png',
	'[翻白眼]':'/bxhl/fby.png',
	'[哈欠]':'/bxhl/hq.png',
	'[奋斗]':'/bxhl/fd.png',
	'[墨镜]':'/bxhl/mj.png',
	'[难过]':'/bxhl/ng.png',
	'[撇嘴]':'/bxhl/pz.png',
	'[抓狂]':'/bxhl/zk.png',
	'[生气]':'/bxhl/sq.png',
	'[口罩]':'/bxhl/kz.png'
};
export const emojiName = [
	'[doge•圣诞]',
	'[妙啊•圣诞]',
	'[呲牙•圣诞]',
	'[OK•圣诞]',
	'[星星眼•圣诞]',
	'[吃瓜•圣诞]',
	'[滑稽•圣诞]',
	'[辣眼睛•圣诞]',
	'[打call•圣诞]',
	'[捂脸•圣诞]',
	'[哦呼]',
	'[歪嘴]',
	'[嫌弃]',
	'[喜欢]',
	'[酸了]',
	'[大哭]',
	'[害羞]',
	'[疑惑]',
	'[调皮]',
	'[喜极而泣]',
	'[奸笑]',
	'[笑]',
	'[偷笑]',
	'[大笑]',
	'[阴险]',
	'[捂脸]',
	'[囧]',
	'[呆]',
	'[抠鼻]',
	'[惊喜]',
	'[惊讶]',
	'[滑稽]',
	'[点赞]',
	'[鼓掌]',
	'[无语]',
	'[尴尬]',
	'[冷]',
	'[灵魂出窍]',
	'[委屈]',
	'[骄傲]',
	'[疼]',
	'[吓]',
	'[生病]',
	'[吐]',
	'[嘘声]',
	'[捂眼]',
	'[思考]',
	'[再见]',
	'[翻白眼]',
	'[哈欠]',
	'[奋斗]',
	'[墨镜]',
	'[难过]',
	'[撇嘴]',
	'[抓狂]',
	'[生气]',
	'[口罩]'
];

export const _TextMsgParser = (msg) => {
  const renderDom = [];
  let left = -1;
  let right = -1;
  while (msg) {
    left = msg.indexOf('[');
    right = msg.indexOf(']');
    if (left === 0) {
      if (right === -1) {
        renderDom.push({ name: 'text', text: msg });
        break;
      }
      // 在表中查找 emoji是否存在
      const _emoji = emojiMap[msg.slice(0, right + 1)];
      if (_emoji) {
        renderDom.push({
          name: 'image',
          src: emojiUrl + _emoji,
        });
        msg = msg.slice(right + 1);
      } else {
        renderDom.push({
          name: 'text',
          text: '[',
        });
        msg = msg.slice(1);
      }
    } else {
      // 是否找到了 left
      const ifFindLeft = left !== -1;
      renderDom.push({
        name: 'text',
        text: ifFindLeft ? msg.slice(0, left) : msg,
      });
      msg = ifFindLeft ? msg.slice(left) : '';
    }
  }
  return renderDom;
};