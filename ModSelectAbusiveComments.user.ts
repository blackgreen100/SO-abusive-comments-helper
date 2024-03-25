StackExchange.ready(function () {
    if (!StackExchange?.options?.user?.isModerator) {
        return;
    }

    const parentUrl = window.location.pathname;
    const sessionStorageKey = '__usr_modmsg_comments'

    const elementIds = {
        commentActionsPopover: 'comment-history-actions',
        commentTable: 'post-comment-table',
        messageContents: 'js-message-contents',
        messageTextArea: 'wmd-input'
    };

    function appendSelectedCommentsAction() {
        const match = parentUrl.match(/\/admin\/users\/(\d+)\/post-comments/);

        let userId = '';
        if (match) {
            userId = match[1];
        } else {
            StackExchange.helpers.showToast('UserScript Message - user id not found!', {type: 'danger'});
            return;
        }

        const copyToMessage = $('<a class="s-block-link" href="#" data-role="copy-to-message">Copy to mod message</a>');

        const commentActionsMenu = $(`#${elementIds.commentActionsPopover} ul`);
        const listItem = $('<li role="menuitem" class="d-flex gy4 fd-column mb12"></li>');
        commentActionsMenu.append(listItem);
        listItem.append(copyToMessage);

        copyToMessage.on('click', function (_) {
            const selectedComments = $(`#${elementIds.commentTable} tbody tr`)
              .filter((i, el) => {
                  const checkbox = $(el).find('input.s-checkbox.js-bulk-select') as JQuery<HTMLInputElement>;
                  if (checkbox.length > 0) {
                      return checkbox[0].checked;
                  }
                  return false;
              })
              .find('td:nth-child(2) > div:first-child.py4')
              .map((i, el) => el.innerText.trim())
              .get();

            if (selectedComments.length === 0) {
                return;
            }

            if(!confirm(`Copy ${selectedComments.length} comments into a new 'Abusive to Others' message?`)) {
                return;
            }

            sessionStorage.setItem(sessionStorageKey, JSON.stringify(selectedComments));
            window.location.href = `/users/message/create/${userId}?reasonId=AbusiveToOthers`;
        });
    }

    function autoPopulateMessageTemplate() {
        const jsonStr = sessionStorage.getItem(sessionStorageKey)
        if (!jsonStr) {
            return;
        }
        const comments = JSON.parse(jsonStr) as string[]
        if (comments.length === 0) {
            return
        }

        const populateTemplate = (comments: string[]) => {
            const $textarea = $(`#${elementIds.messageTextArea}`);
            const placeholder = '<!-- Please consider adding examples of the problematic behavior here. Research shows this helps with decreasing recidivism. If you do not include examples, delete the paragraph above. -->'

            const formattedComments = comments
              .map((c) => '> ' + c)
              .join('\n\n')

            $textarea.val(($textarea.val() as string).replace(placeholder, formattedComments));

            observer.disconnect();
            sessionStorage.removeItem(sessionStorageKey)
        }

        const $jsMessageContents = $(`#${elementIds.messageContents}`)[0];

        const observer = new MutationObserver(function(mutationsList, observer) {
            for (let mutation of mutationsList) {
                if (mutation.attributeName === "class") {
                    if (!(mutation.target as HTMLElement).classList.contains('d-none')) {
                        populateTemplate(comments);
                    }
                }
            }
        });
        observer.observe($jsMessageContents, { attributes: true, childList: false, subtree: false, attributeFilter: ['class'] });
    }

    if (parentUrl.includes('post-comments')) {
        appendSelectedCommentsAction();
    }
    if (parentUrl.includes('users/message/create')) {
        autoPopulateMessageTemplate()
    }
});
