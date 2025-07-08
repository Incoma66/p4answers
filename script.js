function toggle(id, isCharacter = false) {
  const target = document.getElementById(id);
  if (!target) return;

  const imgContainerBottom = document.getElementById('character-image');
  const imgTagBottom = document.getElementById('character-img-tag');
  const imgContainerTop = document.getElementById('character-image-top');
  const imgTagTop = document.getElementById('character-img-tag-top');

  if (isCharacter) {
    // Закрываем всех персонажей кроме текущего
    document.querySelectorAll('.ranks').forEach(el => {
      if (el.id !== id) {
        el.classList.add('hidden');
        el.querySelectorAll('.rank.selected').forEach(r => r.classList.remove('selected'));
        el.querySelectorAll('.dialogue').forEach(d => d.classList.add('hidden'));
      }
    });

    // Снимаем выделение со всех персонажей
    document.querySelectorAll('.character.selected').forEach(el => el.classList.remove('selected'));

    const characterElem = document.querySelector(`.character[onclick*="'${id}'"]`);
    if (characterElem) {
      characterElem.classList.add('selected');

      // Показываем/обновляем нижнюю картинку
      const imgUrlBottom = characterElem.getAttribute('data-img') || '';
      if (imgUrlBottom) {
        imgTagBottom.src = imgUrlBottom;
        imgContainerBottom.style.display = 'block';
      } else {
        imgContainerBottom.style.display = 'none';
        imgTagBottom.src = '';
      }

      // Показываем/обновляем верхнюю картинку
      const imgUrlTop = characterElem.getAttribute('data-img-top') || '';
      if (imgUrlTop) {
        imgTagTop.src = imgUrlTop;
        imgContainerTop.style.display = 'block';
      } else {
        imgContainerTop.style.display = 'none';
        imgTagTop.src = '';
      }
    }

    // Переключаем видимость блока рангов
    const wasHidden = target.classList.contains('hidden');
    target.classList.toggle('hidden');

    // Если закрыли блок — убираем картинки
    if (!wasHidden) {
      imgContainerBottom.style.display = 'none';
      imgTagBottom.src = '';
      imgContainerTop.style.display = 'none';
      imgTagTop.src = '';
    }

  } else {
    // Для рангов: закрываем все ранги и диалоги внутри родительского блока
    const parentRanks = target.parentElement;
    if (parentRanks) {
      parentRanks.querySelectorAll('.rank.selected').forEach(r => {
        if (r !== target) r.classList.remove('selected');
      });
      parentRanks.querySelectorAll('.dialogue').forEach(d => {
        if (d.id !== id) d.classList.add('hidden');
      });
    }

    // Переключаем выделение текущего ранга
    target.classList.toggle('selected');

    // Открываем/закрываем диалог с таким же id
    const dialogue = document.getElementById(id);
    if (dialogue && dialogue.classList.contains('dialogue')) {
      dialogue.classList.toggle('hidden');
    }
  }
}

const helpBtn = document.getElementById('help-btn');
const helpTooltip = document.getElementById('help-tooltip');

helpBtn.addEventListener('click', e => {
  e.stopPropagation();
  helpTooltip.classList.toggle('hidden');
});

// Закрываем тултип по клику вне кнопки и тултипа
document.addEventListener('click', () => {
  if (!helpTooltip.classList.contains('hidden')) {
    helpTooltip.classList.add('hidden');
  }
});
