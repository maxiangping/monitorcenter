<template>

	<div class="uix-dialog dialog lt-flexbox flex-column"
	     :class="{'hidden':!show,'uix-dialog-animate':show, [className]: className}">

		<section class="offset inner-content">
			<header class="txc dialog-header">
				<img v-show="icon !== ''"
				     width="50"
				     height="50"
				     class="dialog-icon"
				     :src="icon"
				     style="display: none">
				<h1 class="dialog-title"
				    v-text="title"></h1>
			</header>
			<section class="dialog-section">
				<p class="dialog-content"
				   :class="{'tx-indent':indent}"
				   v-if="html"
				   v-html="content"></p>
				<p class="dialog-content"
				   :class="{'tx-indent':indent}"
				   v-else
				   v-text="content"></p>
			</section>
		</section>
		<footer class="dialog-footer inner-ht">
			<div v-show="showCancel || showConfirm"
			     class="lt-flexbox vertical " :class="{'uix-border top':footerBorderTop}">
				<div v-show="showCancel"
				     class="uix-border right inner-content">
					<input class=" dialog-bn cancel"
					       type="button"
					       @click="onCancel"
					       :value="cancel">
				</div>
				<input v-show="showConfirm"
				       class="inner-content dialog-bn confirm"
				       type="button"
				       @click="onConfirm"
				       :value="confirm">
			</div>
		</footer>

	</div>
</template>

<script>
import {mapState} from 'vuex';
export default {
	name: 'Dialog',
	computed: mapState({
		title: (state) => state.pub.component_dialog.title,
		icon: (state) => state.pub.component_dialog.icon,
		content: (state) => state.pub.component_dialog.content,
		confirm: (state) => state.pub.component_dialog.confirm,
		cancel: (state) => state.pub.component_dialog.cancel,
		indent: (state) => state.pub.component_dialog.indent,
		html: (state) => state.pub.component_dialog.html,
		timer: (state) => state.pub.component_dialog.timer,
		showConfirm: (state) => state.pub.component_dialog.showConfirm,
		showCancel: (state) => state.pub.component_dialog.showCancel,
		show: (state) => state.pub.component_dialog.show,
		className: (state) => state.pub.component_dialog.className,
		footerBorderTop: (state) => state.pub.component_dialog.footerBorderTop,
	}),
	methods: {
		destroy() {
			this.$store.dispatch('destroy_dialog');
		},
		onConfirm() {
			let {confirm_fn} = this.$store.state.pub.component_dialog;
			if (confirm_fn instanceof Function) {
				confirm_fn.apply(this, []);
			}
			this.destroy();
		},
		onCancel() {
			let {cancel_fn} = this.$store.state.pub.component_dialog;
			if (cancel_fn instanceof Function) {
				cancel_fn.apply(this, []);
			}
			this.destroy();
		},
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.dialog {
  position: fixed;
  z-index: 20;
  top: 50%;
  left: 50%;

  overflow: hidden;

  width: 80%;
  max-width: 500px;
  height: auto;
  max-height: 90%;

  transform: translate3d(-50%, -50%, 0);

  border-radius: 5px;
  box-shadow: 0 0 50px 0 rgba(0, 0, 0, 0.1);
  background: #fff;
  &.hidden {
    z-index: 0;
    box-shadow: none;

    visibility: hidden;
  }
}
</style>
