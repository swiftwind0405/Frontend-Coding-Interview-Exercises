const fs = require('fs-extra');
const path = require('path');

const exercisesPath = path.join(__dirname, 'exercises');

// 递归删除非.test.js的js文件
async function deleteNonTestJsFiles(dir) {
    const items = await fs.readdir(dir);

    for (const item of items) {
        const itemPath = path.join(dir, item);
        const stat = await fs.stat(itemPath);

        if (stat.isDirectory()) {
            await deleteNonTestJsFiles(itemPath);
        } else if (stat.isFile() && item.endsWith('.js') && !item.endsWith('.test.js')) {
            await fs.remove(itemPath);
            console.log(`Deleted: ${itemPath}`);
        }
    }
}

deleteNonTestJsFiles(exercisesPath)
    .then(() => {
        console.log('Non-test JS files have been deleted.');
    })
    .catch(error => {
        console.error('An error occurred while deleting non-test JS files:', error);
    });
