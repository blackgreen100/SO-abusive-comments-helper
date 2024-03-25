StackExchange.ready(function () {
    if (!StackExchange?.options?.user?.isModerator) {
        return;
    }

    const parentUrl = window.location.pathname;
    const match = parentUrl.match(/\/admin\/users\/(\d+)\/post-comments/);

    let userId = '';
    if (match) {
        userId = match[1];
    } else {
        StackExchange.helpers.showToast('UserScript Message - user id not found!', {type: 'danger'});
        return;
    }

    const elementIds = {
        commentActionsPopover: 'comment-history-actions',
        commentTable: 'post-comment-table'
    };

    function appendSelectedCommentsAction() {
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

            sessionStorage.setItem('__usr_modmsg_comments', JSON.stringify(selectedComments));
            window.location.href = `/users/message/create/${userId}?reasonId=AbusiveToOthers`;
        });
    }

    appendSelectedCommentsAction();

});
