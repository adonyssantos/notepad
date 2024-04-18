const $editor = document.getElementById('editor');
const $characters = document.getElementById('characters');
const $words = document.getElementById('words');
const $reset = document.getElementById('reset');
const $save = document.getElementById('save');

const updateCounters = () => {
    const text = $editor.value;
    $characters.value = text.length;
    $words.value = text.split(/\s+/).filter(word => word).length;
}

$editor.addEventListener('input', updateCounters);

// Save text to local storage
$editor.value = localStorage.getItem('text') || '';
$editor.addEventListener('input', () => {
    localStorage.setItem('text', $editor.value);
});

// Load text from local storage
window.addEventListener('load', () => {
    window.addEventListener('storage', () => {
        $editor.value = localStorage.getItem('text');
        updateCounters();
    });
    updateCounters();
});

// Reset text
$reset.addEventListener('click', () => {
    $editor.value = '';
    $characters.value = 0;
    $words.value = 0;
    localStorage.removeItem('text');
});

// Save text to a file
$save.addEventListener('click', () => {
    const text = $editor.value;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'text.txt';
    a.click();
});
