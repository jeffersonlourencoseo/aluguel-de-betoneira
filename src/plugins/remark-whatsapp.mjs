// Nos .md, os botoes de WhatsApp sao HTML cru. Este plugin troca o href de qualquer
// link wa.me pelo whatsappUrl do config (mensagem padrao unica) e adiciona a etiqueta de evento.
import { basename } from 'node:path';
import { whatsappUrl } from '../data/config.ts';

const LINK = /<a\b([^>]*?)href="https:\/\/wa\.me\/[^"]*"([^>]*)>/g;

function walk(node, fn) {
  fn(node);
  if (node.children) node.children.forEach((c) => walk(c, fn));
}

export default function remarkWhatsapp() {
  return (tree, file) => {
    const slug = basename(file.path || 'post', '.md');
    walk(tree, (node) => {
      if (node.type === 'html') {
        node.value = node.value.replace(
          LINK,
          (_m, before, after) =>
            `<a${before.length ? ' ' + before.trim() : ''} href="${whatsappUrl}" data-evento="clique_whatsapp" data-local="post-${slug}-texto"${after}>`.replace(/<a +href/, '<a href'),
        );
      }
    });
  };
}
