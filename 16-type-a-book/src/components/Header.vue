<script>
export default {
    name: 'Header',
    props: {
        title: String
    }
}
</script>

<template>
    <header class="header">
        <div class="book-options"></div>
        <div class="metadata">
            <select class="book-title" @input="e => $emit('handleBookSelection',e.target.value)">
                <option :selected="title === `Alice's Adventures in Wonderland`"
                    value="Alice's Adventures in Wonderland">
                    đđšđļđ°đ˛'đ đđąđđ˛đģđđđŋđ˛đ đļđģ đĒđŧđģđąđ˛đŋđšđŽđģđą đģđ đĢđžđđđ đĸđēđđđđđ
                </option>
                <option :selected="title === 'The Call of the Wild'" value="The Call of the Wild">
                    đ§đĩđ˛ đđŽđšđš đŧđŗ đđĩđ˛ đĒđļđšđą đģđ đŠđēđŧđ đĢđđđŊđđ
                </option>
                <option :selected="title === 'The Great Gatsby'" value="The Great Gatsby">
                    đ§đĩđ˛ đđŋđ˛đŽđ đđŽđđđ¯đ đģđ đĨ. đ˛đŧđđđ đĨđđđđđžđđēđđŊ
                </option>
                <option :selected="title === `Heart's Kindred`" value="Heart's Kindred">
                    đđ˛đŽđŋđ'đ đđļđģđąđŋđ˛đą đģđ đšđđđē đĻđēđđž
                </option>
                <option :selected="title === 'Jane Eyre'" value="Jane Eyre">
                    đđŽđģđ˛ đđđŋđ˛ đģđ đĸđđēđđđđđđž đĄđđđđđžĖ
                </option>
                <option :selected="title === 'The Strange Case of Dr. Jekyll and Mr. Hyde'"
                    value="The Strange Case of Dr. Jekyll and Mr. Hyde">
                    đ§đĩđ˛ đĻđđŋđŽđģđ´đ˛ đđŽđđ˛ đŧđŗ đđŋ. đđ˛đ¸đđšđš đŽđģđą đ đŋ. đđđąđ˛ đģđ đąđđģđžđđ
                    đĢđđđđ đ˛đđžđđžđđđđ
                </option>
                <option :selected="title === 'The Time Machine'" value="The Time Machine">
                    đ§đĩđ˛ đ§đļđēđ˛ đ đŽđ°đĩđļđģđ˛ đģđ đ§. đĻ. đļđžđđđ
                </option>
            </select>
        </div>
        <div class="site-options"></div>
    </header>
</template>

<style scoped>
    .header {
    margin: 1rem auto;
    width: 61.25rem;
    display: flex;
    justify-content: space-between;
    }
    .book-title {
    font-size: 1rem;
    font-weight: 400;
    padding: 0.25rem;
    border: none;
    outline-color: #008ada;
    border: 1px solid transparent;
    border-radius: 0.25rem;
    text-align: center;
    }
    .book-title:hover {
    border: 1px solid #cecece;
    cursor: pointer;
    }
</style>