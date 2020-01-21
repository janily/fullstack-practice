# -*- coding:utf-8 -*-

import os

class ImageRename():
    def __init__(self):
        # 指定要重命名文件的路径
        self.path = ''    

    def rename(self):
        filelist = os.listdir(self.path)
        total_num = len(filelist)

        i = 1

        for item in filelist:
            if item.endswith('.png'):
                src = os.path.join(os.path.abspath(self.path), item)
                dst = os.path.join(os.path.abspath(self.path), 'ani-' + format(str(i), '0>2s') + '.png')
                os.rename(src, dst)
                # print 'converting %s to %s ...' % (src, dst)
                i = i + 1

if __name__ == '__main__':
    newname = ImageRename()
    newname.rename()
