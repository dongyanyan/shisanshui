(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Chat/ChatMessage.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'dc8980X2ZVNKrH9BsIsSE4D', 'ChatMessage', __filename);
// scripts/Chat/ChatMessage.js

"use strict";

// 用于在游戏过程中，展示用户的聊天消息

var ChatMessage = cc.Class({
    extends: cc.Component,

    properties: {
        richText: cc.RichText,
        spriteBackground: cc.Sprite,
        emoji: cc.Node
    },

    // use this for initialization
    onLoad: function onLoad() {
        ChatMessage.instances = this;
    },

    setString: function setString() {
        var string = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
        var autoHide = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

        if (string.length == 0) {
            return;
        }

        this.node.active = true;
        this.richText.node.active = true;
        this.spriteBackground.node.active = true;
        this.emoji.active = false;
        var maxWidth = 300;
        var realStr = ChatMessage.parseString(string);

        // 由于 cc.RichText 在指定 maxWidth 后，该结点的 width 会一直
        // 是 maxWidth 值。而在将 maxWidth 指定为0时，其 contentSize.width 会
        // 是内容的真正所需的宽度
        //
        // 所以这里先将 maxWidth 设为 0，获取其实际内容 width 后再调整
        this.richText.maxWidth = 0;
        this.richText.string = realStr;

        var contentWidth = this.richText.node.getContentSize().width;
        if (contentWidth > maxWidth) {
            this.richText.maxWidth = maxWidth;
            this.richText.string = realStr;
            contentWidth = maxWidth;
        }

        this.node.width = contentWidth + 28;
        this.node.height = this.richText.node.getContentSize().height + 20;

        this.spriteBackground.node.width = this.node.width;
        this.spriteBackground.node.height = this.node.height;

        if (autoHide) {
            this._hideNode();
            //this.unscheduleAllCallbacks();
            //this.scheduleOnce(this._hideNode.bind(this), 3);
        }
    },

    showEmoji: function showEmoji(sprite) {
        this._hideNode();
        this.node.active = true;
        this.emoji.active = true;
        this.richText.node.active = false;
        this.spriteBackground.node.active = false;
        var btnSprites = this.emoji.getComponent(cc.Sprite);
        btnSprites.spriteFrame = sprite;
    },

    _hideNode: function _hideNode() {
        this.unscheduleAllCallbacks();
        this.scheduleOnce(function () {
            this.node.active = false;
        }.bind(this), 3);
    }

});
ChatMessage.setEmoji = function (sprite) {
    this.instances._hideNode();
    this.instances.node.active = true;
    this.instances.emoji.active = true;
    this.instances.richText.node.active = false;
    this.instances.spriteBackground.node.active = false;
    var btnSprites = this.instances.emoji.getComponent(cc.Sprite);
    btnSprites.spriteFrame = sprite;
    //console.log(this.emoji);
    //return;
    //
    //this.emoji.Sprite = sprite;
},

// 将 <bq10> 改为： <img src='bg10'/>
ChatMessage.parseString = function (str) {
    var result = str.replace(/<bq\d{1,2}>/g, function (match) {
        var bq = match.replace("<", " <img src='").replace(">", "'/> ");
        return bq;
    });
    return result;
}, module.exports = ChatMessage;

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=ChatMessage.js.map
        