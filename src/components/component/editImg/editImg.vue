<template>
    <transition name="fade">
        <div id="editImg" class="editImg-wrap" :style="{height:`${editorHeight}px`}" v-show="isShow">
            <mt-header title="图片编辑" v-once>
                <div slot="left">
                    <mt-button @click="restoreImg">撤销</mt-button>
                </div>
                <div slot="right">
                    <mt-button @click="save">保存</mt-button>
                </div>
            </mt-header>
            <loading ref="editInstance" @imgChanged="imgChanged" @getImageCropper="getImageCropper"></loading>
        </div>
    </transition>
</template>

<script>
    import {mapMutations} from 'vuex';
    import getCropitData from '../../service/getCropitData.js';

    let imageCropper,
        imgIsChanged
    ;

    export default {
        data: () => ({
            editorHeight: window.innerHeight,
            isShow: false
        }),
        props: [],

        methods: {
            save(){
                let {
                    $store: {
                        commit,
                        state
                    },
                    $emit
                } = this;

                let postData = getCropitData({
                    cropit: imgIsChanged,
                    ...state.editImgModule.customParams
                });
                console.log('postData',postData)
                this.$emit('editFinish', {postData, imgData: imageCropper.cropit('export')});
                commit('hideEditor');
                imageCropper.cropit('imageSrc', "");
            },
            restoreImg(){
                this.$refs.editInstance.restore()
            },
            imgChanged(){
                imgIsChanged = true;
            },
            getImageCropper(ele){
                imageCropper = ele;
            }
        },
        beforeCreate(){
            const vm = this;
            this.$store.registerModule(
                'editImgModule',
                {
                    state: {
                        imgSrc: '',
                        imgSize: {
                            width: 200,
                            height: 200
                        },
                        initialCrop: false,
                        customParams: false
                    },
                    mutations: {
                        showEditor(state, payload){
                        	console.log(state)
                            Object.assign(state, payload);
                            vm.isShow = true;
                        },
                        hideEditor(state){
                            state.imgSrc = '';
                            vm.isShow = false;
                        },
                        clearImgSrc(state){
                            state.imgSrc = '';
                        },
                        selectPreview(){
                            vm.$emit('selectPreview');
                        },
                        checkDPiFalse(state){
                        		state.customParams.dpi = "false";                        		
                        },
                        checkDPiTrue(state){
                        		state.customParams.dpi = "true";                        		
                        }
                    }
                }
            );
        }
    }
</script>

<style>
    .editImg-wrap {
        position: fixed;
        width: 100%;
        background: #fff;
        top: 0;
        left: 0;
        z-index: 9;
    }
</style>