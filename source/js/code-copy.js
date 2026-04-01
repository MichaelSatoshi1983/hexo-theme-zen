(function () {
  function getSettings() {
    var settings = window.ZenThemeCodeHighlight || {};
    return {
      copy_text: settings.copy_text || '复制',
      copied_text: settings.copied_text || '已复制'
    };
  }

  function getCodeText(block) {
    var code = block.querySelector('pre code') || block.querySelector('code') || block.querySelector('pre');
    return code ? (code.textContent || '').replace(/\n$/, '') : '';
  }

  function copyWithExecCommand(text) {
    var textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', 'readonly');
    textarea.style.position = 'fixed';
    textarea.style.top = '-9999px';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();

    try {
      return document.execCommand('copy');
    } finally {
      document.body.removeChild(textarea);
    }
  }

  function writeClipboard(text) {
    if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
      return navigator.clipboard.writeText(text).catch(function () {
        if (!copyWithExecCommand(text)) {
          throw new Error('Copy failed');
        }
      });
    }

    if (!copyWithExecCommand(text)) {
      return Promise.reject(new Error('Copy failed'));
    }

    return Promise.resolve();
  }

  function setButtonState(button, label) {
    button.textContent = label;
  }

  function createHeader(settings) {
    var header = document.createElement('div');
    var button = document.createElement('button');

    header.className = 'highlight-header';
    button.className = 'highlight-copy-button';
    button.type = 'button';
    button.textContent = settings.copy_text;
    button.setAttribute('aria-label', settings.copy_text);

    header.appendChild(button);
    return { header: header, button: button };
  }

  function enhanceBlock(block, settings) {
    if (block.dataset.copyEnhanced === 'true') {
      return;
    }

    var text = getCodeText(block);
    if (!text) {
      return;
    }

    var parts = createHeader(settings);
    var resetTimer = null;

    parts.button.addEventListener('click', function () {
      writeClipboard(text).then(function () {
        setButtonState(parts.button, settings.copied_text);
        window.clearTimeout(resetTimer);
        resetTimer = window.setTimeout(function () {
          setButtonState(parts.button, settings.copy_text);
        }, 1800);
      }).catch(function () {
        setButtonState(parts.button, settings.copy_text);
      });
    });

    block.insertBefore(parts.header, block.firstChild);
    block.dataset.copyEnhanced = 'true';
  }

  function enhanceCodeBlocks(root) {
    var settings = getSettings();
    var scope = root || document;
    var blocks = scope.querySelectorAll('.highlight');

    blocks.forEach(function (block) {
      enhanceBlock(block, settings);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      enhanceCodeBlocks(document);
    });
  } else {
    enhanceCodeBlocks(document);
  }
})();
