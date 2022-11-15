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
                    𝗔𝗹𝗶𝗰𝗲'𝘀 𝗔𝗱𝘃𝗲𝗻𝘁𝘂𝗿𝗲𝘀 𝗶𝗻 𝗪𝗼𝗻𝗱𝗲𝗿𝗹𝗮𝗻𝗱 𝖻𝗒 𝖫𝖾𝗐𝗂𝗌 𝖢𝖺𝗋𝗋𝗈𝗅𝗅
                </option>
                <option :selected="title === 'The Call of the Wild'" value="The Call of the Wild">
                    𝗧𝗵𝗲 𝗖𝗮𝗹𝗹 𝗼𝗳 𝘁𝗵𝗲 𝗪𝗶𝗹𝗱 𝖻𝗒 𝖩𝖺𝖼𝗄 𝖫𝗈𝗇𝖽𝗈𝗇
                </option>
                <option :selected="title === 'The Great Gatsby'" value="The Great Gatsby">
                    𝗧𝗵𝗲 𝗚𝗿𝗲𝗮𝘁 𝗚𝗮𝘁𝘀𝗯𝘆 𝖻𝗒 𝖥. 𝖲𝖼𝗈𝗍𝗍 𝖥𝗂𝗍𝗓𝗀𝖾𝗋𝖺𝗅𝖽
                </option>
                <option :selected="title === `Heart's Kindred`" value="Heart's Kindred">
                    𝗛𝗲𝗮𝗿𝘁'𝘀 𝗞𝗶𝗻𝗱𝗿𝗲𝗱 𝖻𝗒 𝖹𝗈𝗇𝖺 𝖦𝖺𝗅𝖾
                </option>
                <option :selected="title === 'Jane Eyre'" value="Jane Eyre">
                    𝗝𝗮𝗻𝗲 𝗘𝘆𝗿𝗲 𝖻𝗒 𝖢𝗁𝖺𝗋𝗅𝗈𝗍𝗍𝖾 𝖡𝗋𝗈𝗇𝗍𝖾̈
                </option>
                <option :selected="title === 'The Strange Case of Dr. Jekyll and Mr. Hyde'"
                    value="The Strange Case of Dr. Jekyll and Mr. Hyde">
                    𝗧𝗵𝗲 𝗦𝘁𝗿𝗮𝗻𝗴𝗲 𝗖𝗮𝘀𝗲 𝗼𝗳 𝗗𝗿. 𝗝𝗲𝗸𝘆𝗹𝗹 𝗮𝗻𝗱 𝗠𝗿. 𝗛𝘆𝗱𝗲 𝖻𝗒 𝖱𝗈𝖻𝖾𝗋𝗍
                    𝖫𝗈𝗎𝗂𝗌 𝖲𝗍𝖾𝗏𝖾𝗇𝗌𝗈𝗇
                </option>
                <option :selected="title === 'The Time Machine'" value="The Time Machine">
                    𝗧𝗵𝗲 𝗧𝗶𝗺𝗲 𝗠𝗮𝗰𝗵𝗶𝗻𝗲 𝖻𝗒 𝖧. 𝖦. 𝖶𝖾𝗅𝗅𝗌
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