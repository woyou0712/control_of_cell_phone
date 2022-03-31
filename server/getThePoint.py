# 小妖学习
# 学习时间 2021/11/30 9:57
from os import system as cmd
import aircv as ac
import time


class Screencap:
    def __init__(self, phone=None):
        self.phone = phone
        self.screencap()  # 截屏

    def screencap(self):
        '''
        手机截图
        :return:
        '''
        s = "adb shell screencap -p /sdcard/wendao_path.png"
        p = "adb pull /sdcard/wendao_path.png"
        if self.phone:
            s = "adb -s {} shell screencap -p /sdcard/wendao_path.png".format(self.phone)
            p = "adb -s {} pull /sdcard/wendao_path.png".format(self.phone)
        cmd(s)  # 截屏
        cmd(p)  # 下载

    def matchImg(self, imgobj, confidence=0.7):  # imgsrc=原始图像，imgobj=待查找的图片
        '''
        找图坐标
        :param imgobj: 要找的小图
        :param confidence: 相识度
        :return:
        '''
        imsrc = ac.imread("wendao_path.png")  # 包装截屏
        imobj = ac.imread(imgobj)  # 包装小图

        match_result = ac.find_template(imsrc, imobj, confidence)
        if match_result is not None:
            match_result['shape'] = (imsrc.shape[1], imsrc.shape[0])  # 0为高，1为宽

        return match_result

    def tapImg(self, imgPath):
        '''
        点击图标
        :param imgPath:
        :return:
        '''
        xy = self.matchImg(imgPath)
        if not xy:
            return False
        xy = xy["result"]
        x = int(xy[0]) + 10
        y = int(xy[1]) + 10
        print(x, y)
        code = "adb shell input tap {} {}".format(x, y)
        if self.phone:
            code = "adb -s {} shell input tap {} {}".format(self.phone, x, y)
        cmd(code)
        time.sleep(0.5)
        self.screencap()  # 截屏
        return True

    def tapXy(self, xy):
        if not xy:
            return False
        xy = xy["result"]
        x = int(xy[0]) + 10
        y = int(xy[1]) + 10
        print(x, y)
        code = "adb shell input tap {} {}".format(x, y)
        if self.phone:
            code = "adb -s {} shell input tap {} {}".format(self.phone, x, y)
        cmd(code)
        time.sleep(0.5)
        self.screencap()  # 截屏
        return True

    def tap(self, x=0, y=0):
        code = "adb shell input tap {} {}".format(x, y)
        if self.phone:
            code = "adb -s {} shell input tap {} {}".format(self.phone, x, y)
        cmd(code)
        time.sleep(0.5)
        self.screencap()
        return True
