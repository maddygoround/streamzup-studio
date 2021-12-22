const icons = [
  {
    id: "01-webcam-on",
    code: `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentcolor" viewBox="0 0 35 35"> 
    <path d="M1.738,24.992A1.625,1.625,0,0,1,.167,22.72c.7-1.326,1.549-2.584,2.311-3.835,5.371,3.731,10.686,3.738,16.042.012a.86.86,0,0,1,.063.087q1.026,1.643,2.049,3.287a1.809,1.809,0,0,1,.345,1.307A1.729,1.729,0,0,1,19.166,25Q12.76,25,6.355,25c-.888,0-1.776,0-2.664,0Q2.715,25,1.738,24.992Zm8.748-5A10.259,10.259,0,0,1,.015,9.978,10.263,10.263,0,0,1,10.527,0,10.255,10.255,0,0,1,21,10.018,10.263,10.263,0,0,1,10.527,20Zm-5.225-10a5.13,5.13,0,0,0,5.214,5A5.13,5.13,0,0,0,15.752,10a5.127,5.127,0,0,0-5.24-5h0A5.13,5.13,0,0,0,5.261,9.993Z" transform="translate(7 5)" fill="#fff"/></svg>`,
  },
  {
    id: "01-webcam-off",
    code: `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentcolor" viewBox="0 0 35 35">
    <path d="M637.311,4263q-5.356-.009-10.711-.005h-5.356a1.649,1.649,0,0,1-1.733-1.754,2.057,2.057,0,0,1,.266-.832c.674-1.172,1.374-2.329,2.065-3.492.013-.021.028-.042.033-.049a11.755,11.755,0,0,0,13.088,1.455c-.423-.425-.8-.81-1.187-1.179-.047-.044-.19-.022-.27.012a10.11,10.11,0,0,1-2.7.749,10.006,10.006,0,0,1-11.189-8.366,9.542,9.542,0,0,1,.712-5.493.329.329,0,0,0-.081-.441q-1.385-1.359-2.745-2.741a1.656,1.656,0,0,1,.655-2.775,1.625,1.625,0,0,1,1.738.458q1.557,1.554,3.113,3.11,9.18,9.174,18.361,18.347a1.95,1.95,0,0,1,.579.909,1.668,1.668,0,0,1-.735,1.827,1.648,1.648,0,0,1-1.962-.144c-.053-.044-.1-.089-.183-.156a2.01,2.01,0,0,1-1.712.562Zm-7.789-10.028-5-4.994A4.908,4.908,0,0,0,629.521,4252.973Zm7.867.7c-1.087-1.084-2.171-2.173-3.262-3.253a.279.279,0,0,1-.073-.375,4.991,4.991,0,0,0-6.622-6.591.317.317,0,0,1-.285-.026q-1.732-1.709-3.447-3.437a.265.265,0,0,1-.036-.064,9.961,9.961,0,0,1,13.911,13.919C637.512,4253.785,637.448,4253.73,637.388,4253.67Z" transform="translate(-612 -4233)" fill="#c00"/>
    </svg>`,
  },
  {
    id: "link",
    code: `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentcolor" viewBox="0 0 24 24">
<path fill-rule="evenodd" clip-rule="evenodd" d="M14.6352 2.43058C16.5552 0.52314 19.6448 0.52314 21.5648 2.43058L21.5671 2.43289C22.5232 3.38904 23 4.64722 23 5.9C23 7.15278 22.5232 8.41096 21.5671 9.36711L18.4871 12.4471C18.0966 12.8376 17.4634 12.8376 17.0729 12.4471C16.6823 12.0566 16.6823 11.4234 17.0729 11.0329L20.1529 7.95289C20.7167 7.38904 21 6.64722 21 5.9C21 5.15329 20.7171 4.41197 20.154 3.84827C19.0144 2.71737 17.186 2.71724 16.0463 3.84788L10.9525 8.95173C10.3825 9.51428 10.1 10.2536 10.1 11C10.1 11.1344 10.1102 11.2699 10.1289 11.4169C10.14 11.4623 10.1456 11.4981 10.1487 11.5198C10.1504 11.5316 10.1518 11.5428 10.153 11.5536C10.1824 11.6899 10.2162 11.81 10.2583 11.9243C10.2619 11.9341 10.2654 11.9439 10.2687 11.9538C10.3992 12.3455 10.6247 12.718 10.9489 13.0348L10.9571 13.0428C11.1245 13.2103 11.3006 13.3482 11.4745 13.4525C11.9481 13.7367 12.1016 14.3509 11.8175 14.8245C11.5333 15.2981 10.9191 15.4516 10.4455 15.1675C10.1209 14.9728 9.81847 14.7321 9.54692 14.4612C8.99721 13.9227 8.60577 13.282 8.37622 12.6009C8.28732 12.3569 8.22615 12.1199 8.17939 11.8861C8.17773 11.8778 8.17617 11.8694 8.17472 11.8611C8.16876 11.8348 8.16386 11.8082 8.16003 11.7814C8.12562 11.5406 8.09998 11.2811 8.09998 11C8.09998 9.74748 8.57666 8.48785 9.54506 7.5307L14.6352 2.43058ZM8.15998 11.69C8.15998 11.6922 8.15998 11.6944 8.16 11.6967L8.15998 11.69Z"></path>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.1825 9.17551C12.4667 8.70192 13.0809 8.54836 13.5545 8.83251C13.8791 9.02724 14.1815 9.26791 14.4531 9.53885C15.0028 10.0774 15.3942 10.718 15.6238 11.3991C15.7127 11.6431 15.7738 11.8801 15.8206 12.1139C15.8222 12.1222 15.8238 12.1306 15.8253 12.1389C15.8312 12.1652 15.8361 12.1918 15.8399 12.2186C15.8744 12.4594 15.9 12.7189 15.9 13C15.9 14.2525 15.4233 15.5122 14.4549 16.4693L9.36479 21.5694C7.44481 23.4769 4.3552 23.4769 2.43522 21.5694L2.43289 21.5671C1.47674 20.611 1 19.3528 1 18.1C1 16.8472 1.47674 15.589 2.43289 14.6329L5.51289 11.5529C5.90342 11.1624 6.53658 11.1624 6.92711 11.5529C7.31763 11.9434 7.31763 12.5766 6.92711 12.9671L3.84711 16.0471C3.28326 16.611 3 17.3528 3 18.1C3 18.8467 3.28287 19.588 3.84595 20.1517C4.98554 21.2826 6.81395 21.2828 7.95368 20.1521C7.95419 20.1516 7.9547 20.1511 7.95522 20.1506L11.5319 16.5639L13.0475 15.0483C13.6175 14.4857 13.9 13.7464 13.9 13C13.9 12.8656 13.8897 12.7301 13.8711 12.5831C13.8599 12.5377 13.8544 12.5019 13.8513 12.4802C13.8496 12.4684 13.8482 12.4572 13.847 12.4464C13.8176 12.3101 13.7838 12.19 13.7417 12.0757C13.7381 12.0659 13.7346 12.0561 13.7313 12.0462C13.6007 11.6545 13.3752 11.282 13.0511 10.9652L13.0428 10.9572C12.8754 10.7897 12.6993 10.6518 12.5255 10.5475C12.0519 10.2633 11.8984 9.64909 12.1825 9.17551ZM15.84 12.31C15.84 12.3078 15.84 12.3056 15.84 12.3033L15.84 12.31Z"></path>

</svg>`,
  },
  {
    id: "unlink",
    code: `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentcolor" viewBox="0 0 24 24">
<path fill-rule="evenodd" clip-rule="evenodd" d="M14.6352 2.43058C16.5552 0.52314 19.6448 0.52314 21.5648 2.43058L21.5671 2.43289C22.5232 3.38904 23 4.64722 23 5.9C23 7.15278 22.5232 8.41096 21.5671 9.36711L18.4871 12.4471C18.0966 12.8376 17.4634 12.8376 17.0729 12.4471C16.6823 12.0566 16.6823 11.4234 17.0729 11.0329L20.1529 7.95289C20.7167 7.38904 21 6.64722 21 5.9C21 5.15329 20.7171 4.41197 20.154 3.84827C19.0144 2.71737 17.186 2.71724 16.0463 3.84788L10.9525 8.95173C10.3825 9.51428 10.1 10.2536 10.1 11C10.1 11.1344 10.1102 11.2699 10.1289 11.4169C10.14 11.4623 10.1456 11.4981 10.1487 11.5198C10.1504 11.5316 10.1518 11.5428 10.153 11.5536C10.1824 11.6899 10.2162 11.81 10.2583 11.9243C10.2619 11.9341 10.2654 11.9439 10.2687 11.9538C10.3992 12.3455 10.6247 12.718 10.9489 13.0348L10.9571 13.0428C11.1245 13.2103 11.3006 13.3482 11.4745 13.4525C11.9481 13.7367 12.1016 14.3509 11.8175 14.8245C11.5333 15.2981 10.9191 15.4516 10.4455 15.1675C10.1209 14.9728 9.81847 14.7321 9.54692 14.4612C8.99721 13.9227 8.60577 13.282 8.37622 12.6009C8.28732 12.3569 8.22615 12.1199 8.17939 11.8861C8.17773 11.8778 8.17617 11.8694 8.17472 11.8611C8.16876 11.8348 8.16386 11.8082 8.16003 11.7814C8.12562 11.5406 8.09998 11.2811 8.09998 11C8.09998 9.74748 8.57666 8.48785 9.54506 7.5307L14.6352 2.43058ZM8.15998 11.69C8.15998 11.6922 8.15998 11.6944 8.16 11.6967L8.15998 11.69Z"></path>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.1825 9.17551C12.4667 8.70192 13.0809 8.54836 13.5545 8.83251C13.8791 9.02724 14.1815 9.26791 14.4531 9.53885C15.0028 10.0774 15.3942 10.718 15.6238 11.3991C15.7127 11.6431 15.7738 11.8801 15.8206 12.1139C15.8222 12.1222 15.8238 12.1306 15.8253 12.1389C15.8312 12.1652 15.8361 12.1918 15.8399 12.2186C15.8744 12.4594 15.9 12.7189 15.9 13C15.9 14.2525 15.4233 15.5122 14.4549 16.4693L9.36479 21.5694C7.44481 23.4769 4.3552 23.4769 2.43522 21.5694L2.43289 21.5671C1.47674 20.611 1 19.3528 1 18.1C1 16.8472 1.47674 15.589 2.43289 14.6329L5.51289 11.5529C5.90342 11.1624 6.53658 11.1624 6.92711 11.5529C7.31763 11.9434 7.31763 12.5766 6.92711 12.9671L3.84711 16.0471C3.28326 16.611 3 17.3528 3 18.1C3 18.8467 3.28287 19.588 3.84595 20.1517C4.98554 21.2826 6.81395 21.2828 7.95368 20.1521C7.95419 20.1516 7.9547 20.1511 7.95522 20.1506L11.5319 16.5639L13.0475 15.0483C13.6175 14.4857 13.9 13.7464 13.9 13C13.9 12.8656 13.8897 12.7301 13.8711 12.5831C13.8599 12.5377 13.8544 12.5019 13.8513 12.4802C13.8496 12.4684 13.8482 12.4572 13.847 12.4464C13.8176 12.3101 13.7838 12.19 13.7417 12.0757C13.7381 12.0659 13.7346 12.0561 13.7313 12.0462C13.6007 11.6545 13.3752 11.282 13.0511 10.9652L13.0428 10.9572C12.8754 10.7897 12.6993 10.6518 12.5255 10.5475C12.0519 10.2633 11.8984 9.64909 12.1825 9.17551ZM15.84 12.31C15.84 12.3078 15.84 12.3056 15.84 12.3033L15.84 12.31Z"></path>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.05968 1.03447C9.59293 0.890725 10.1417 1.20648 10.2855 1.73973L10.9055 4.03973C11.0492 4.57298 10.7335 5.12179 10.2002 5.26554C9.66698 5.40929 9.11816 5.09353 8.97442 4.56028L8.35442 2.26028C8.21067 1.72703 8.52643 1.17822 9.05968 1.03447Z"></path>
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.7997 18.7345C14.3329 18.5907 14.8817 18.9065 15.0255 19.4397L15.6455 21.7397C15.7892 22.273 15.4735 22.8218 14.9402 22.9655C14.407 23.1093 13.8582 22.7935 13.7144 22.2603L13.0944 19.9603C12.9507 19.427 13.2664 18.8782 13.7997 18.7345Z"></path>
<path fill-rule="evenodd" clip-rule="evenodd" d="M18.7037 13.8029C18.8457 13.2691 19.3935 12.9516 19.9272 13.0936L22.2572 13.7136C22.7909 13.8556 23.1084 14.4034 22.9664 14.9371C22.8244 15.4709 22.2766 15.7884 21.7429 15.6464L19.4129 15.0264C18.8792 14.8844 18.5617 14.3366 18.7037 13.8029Z"></path>
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.1608 16.165C16.5502 15.7733 17.1834 15.7714 17.575 16.1608L19.285 17.8608C19.6767 18.2502 19.6786 18.8834 19.2892 19.275C18.8998 19.6667 18.2666 19.6685 17.875 19.2792L16.165 17.5792C15.7733 17.1898 15.7714 16.5566 16.1608 16.165Z"></path>
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.71087 4.72496C5.10024 4.33329 5.73341 4.33144 6.12507 4.72082L7.83507 6.42082C8.22674 6.81019 8.2286 7.44336 7.83922 7.83502C7.44984 8.22669 6.81668 8.22855 6.42501 7.83917L4.71501 6.13917C4.32335 5.74979 4.32149 5.11663 4.71087 4.72496Z"></path>
<path fill-rule="evenodd" clip-rule="evenodd" d="M1.03363 9.06286C1.17565 8.52915 1.72344 8.21162 2.25715 8.35364L4.58715 8.97364C5.12086 9.11566 5.43839 9.66344 5.29638 10.1972C5.15436 10.7309 4.60657 11.0484 4.07286 10.9064L1.74286 10.2864C1.20914 10.1444 0.891612 9.59658 1.03363 9.06286Z"></path>
</svg>`,
  },
];
export default icons;
