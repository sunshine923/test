const Main = Vue.component('Main',{
    template:`
        <div class="template"> 
            <div class="con"> 
                <div class="left">
                    <router-view name="left"></router-view>
                </div>
                <div class="right">
                    <router-view name="right"></router-view>
                </div>
            </div>
        </div>
    `
})
const Left = Vue.component('Left',{
    data(){
        return{
            data:[]
        }
    },
    template:`
        <div> 
           <ul> 
           <div v-for="item in menu"> 
                <li>
                <router-link :to="'#'+item.id">{{item.title}}</router-link> 
                </li>
                    <ul> 
                        <li v-for="item1 in item.child">
                        <router-link :to="'#'+item1.id"> {{item1.title}}
                        </router-link>
                        </li>
                    </ul>
              
           </div>
           </ul>
        </div>
    `,
    computed:{
        menu(){
            var arr=[];
           for(let i in this.data){
               if(this.data[i].pid==0){
                   let obj =this.data[i]
                   arr.push(obj)
               }else{
                   for(let j in arr){
                       if(arr[j].id == this.data[i].pid){
                           if(arr[j].child){
                               arr[j].child.push(this.data[i])
                           }else{
                               arr[j].child=[];
                               arr[j].child.push(this.data[i])
                           }
                       }
                   }
               }
            }
            return arr;
        }
    },
    mounted(){
        fetch('./data.txt').then(function (e) {
            return e.json();
        }).then((e)=>{
            this.data=e;
        })
    },
    watch:{
        $route:function () {
            let hash = this.$route.hash.slice(1);
            let top = document.querySelector('.a'+hash).offsetTop-50
            function animate () {
                if (TWEEN.update()) {
                    requestAnimationFrame(animate)
                }
            }
            new TWEEN.Tween({ number: document.querySelector('.right').scrollTop })
                .easing(TWEEN.Easing.Quadratic.Out)
                .to({ number: top }, 500)
                .onUpdate(function () {
                    document.querySelector('.right').scrollTop = this.number.toFixed(0)
                })
                .start()

            animate()
        }
    }

})
const Right = Vue.component('Right',{
    data(){
        return{
            data:''
        }
    },
    mounted(){
        fetch('./doc.txt').then(function (e) {
            return e.text();
        }).then((e)=>{
            this.data=e;
        })
    },
    template:`
        <div class="markdown-body"> 
            <div v-html="data"></div>
        </div>
    `
})
const Team = Vue.component('Team',{
    template:`
    <div> 
        <div class="content">
        在进入/离开的过渡中，会有 6 个 class 切换。
v-enter：定义进入过渡的开始状态。在元素被插入时生效，在下一个帧移除。

v-enter-active：定义过渡的状态。在元素整个过渡过程中作用，在元素被插入时生效，在 transition/animation 完成之后移除。这个类可以被用来定义过渡的过程时间，延迟和曲线函数。

v-enter-to: 2.1.8版及以上 定义进入过渡的结束状态。在元素被插入一帧后生效 (与此同时 v-enter 被删除)，在 transition/animation 完成之后移除。

v-leave: 定义离开过渡的开始状态。在离开过渡被触发时生效，在下一个帧移除。

v-leave-active：定义过渡的状态。在元素整个过渡过程中作用，在离开过渡被触发后立即生效，在 transition/animation 完成之后移除。这个类可以被用来定义过渡的过程时间，延迟和曲线函数。

v-leave-to: 2.1.8版及以上 定义离开过渡的结束状态。在离开过渡被触发一帧后生效 (与此同时 v-leave 被删除)，在 transition/animation 完成之后移除。
</div>
    </div>
    `
})