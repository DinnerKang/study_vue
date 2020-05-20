<template>
    <div class="thumbnail">
        <div class="thumbnail-list" v-for="(data, idx) in thumbnailList" :key="idx">
            <img
                class="thumbnail-list__item"
                :class="{ active_btn : data.url.i === selectThumbnail }"
                :src="data.url.i"
                alt="이미지"
                @click="clickThumbnail(data.url)"
            />
            <img class="icon" :src="deleteIcon" alt="삭제" @click="deleteThumbnail(data.fullPath)" />
        </div>

        <div class="icon_area" v-if="thumbnailList.length < 10">
            <img class="add_icon" :src="addImageIcon" alt="이미지 추가" @click="$refs.file.click()" />
        </div>
        <input type="file" ref="file" @change="fileChange" style="display:none" multiple />
        <div class="loader-area" v-if="loading">
            <div class="loader"></div>
        </div>
    </div>
</template>

<script>
import { computed, ref } from "@vue/composition-api";
import addImageIcon from "@/assets/icons/mypage_button_40x40(x2).png";
import { getThumbnail, uploadFile, deleteFile  } from "@/services/storage";
import deleteIcon from "@/assets/icons/delete-icon.png";

const thumbnailsData = (props, emit) => {
    const selectThumbnail = computed(() => props.value);
    const thumbnailList = ref([]);
    const file = ref("");
    const loading = ref(false);

    const getThumbnails = async () => {
        thumbnailList.value = await getThumbnail(props.dealiName);
        loading.value = false;
    };

    const clickThumbnail = (data) => {
        emit("input", data.i);
    };
    const deleteThumbnail = async (fullPath) => {
        if (!confirm('삭제하시겠습니까?')) return;
        await deleteFile(fullPath);
        await getThumbnails();
    };

    const fileChange = async (e) => {
        loading.value = true;
        await uploadFile(props.dealiName, e.target.files[0]);
        await setTimeout(() => {
            getThumbnails();
        }, 5000);
    };

    return {
        selectThumbnail,
        clickThumbnail,
        addImageIcon,
        thumbnailList,
        file,
        fileChange,
        deleteIcon,
        deleteThumbnail,
        loading,
        ...getThumbnails()
    };
};

export default {
    props: {
        value: {
            type: String
        },
        dealiName: {
            type: String
        }
    },
    setup(props, { emit }) {
        return {
            ...thumbnailsData(props, emit)
        };
    }
};
</script>

<style lang="scss" scoped>
.thumbnail {
    margin-top: 16px;
    width: 100%;
    height: 234px;
    display: grid;
    gap: 15px;
    grid-template-rows: 68px;
    grid-template-columns: repeat(3, 1fr);
    overflow: hidden;

    &-list {
        position: relative;
        width: 90px;
        height: 68px;

        &:hover {
            .icon {
                visibility: visible;
            }
        }
        &__item{
            width: 90px;
            height: 68px;
            box-sizing: border-box;
            border: 1px solid rgba(0, 0, 0, 0);
            cursor: pointer;
        }
        .icon{
            position: absolute;
            width: 20px;
            top: 3px;
            right: 3px;
            visibility: hidden;
            cursor: pointer;
        }
    }
    .icon_area {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 68px;

        .add_icon {
            width: 40px;
            height: 40px;
            cursor: pointer;
        }
    }

    .active_btn {
        border: 1px solid $Main;
    }
}
$size: 100px;
$thickness: 6px;
$base-color: #fff;
$wheel-color: $Main;
$speed: 800ms;

.loader-area{
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 3;

    .loader {
        transform: translate3d(-50%);
        height: $size;
        width: $size;
        border: $thickness solid $base-color;
        border: {
            right-color: $wheel-color;
            top-color: $wheel-color;
            radius: 100%;
        }
    animation: spin $speed infinite linear;
    }
}


@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(359deg); }
}
</style>